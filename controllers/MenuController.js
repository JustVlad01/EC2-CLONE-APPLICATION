const Menu = require('../models/menu');
const Category = require('../models/category');
const Item = require('../models/items');

const createMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId;
    console.log(req.body);
    console.log("Creating restaurant menu");

    try {
        const { title, shortTitle, description, timeRange, categories } = req.body;

        // Validate time range
        if (!timeRange.start || !timeRange.end) return res.status(400).json({ error: "Time range is required" });

        // Create menu
        const menu = await Menu.create({
            title,
            shortTitle,
            description,
            timeRange,
            restaurantId
        });

        // Loop through categories to create each category and its items
        for (const categoryData of categories) {
            const category = await Category.create({
                name: categoryData.name,
                description: categoryData.description,
                menuId: menu._id,
                restaurantId
            });

            for (const itemData of categoryData.items) {
                await Item.create({
                    categoryId: category._id,
                    title: itemData.title,
                    description: itemData.description,
                    price: itemData.price,
                    discountPrice: itemData.discountPrice,
                    availability: itemData.availability,
                    allergens: itemData.allergens,
                    imageURL: itemData.imageUrl,
                    restaurantId
                });
            }
        }

        return res.status(201).json({ message: 'Menu created successfully', menu });
    } catch (error) {
        console.error('Error creating menu:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getMenuById = async (req, res) => {
    try {
        const menuId = req.params.id;
        const menu = await Menu.findById(menuId).populate({
            path: 'categories',
            populate: { path: 'items' }
        });

        if (!menu) return res.status(404).json({ error: 'Menu not found' });

        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;

        // Delete categories and items associated with the menu
        await Category.deleteMany({ menuId });
        await Item.deleteMany({ categoryId: { $in: categories.map(c => c._id) } });
        await Menu.findByIdAndDelete(menuId);

        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, shortTitle, description, timeRange, categories, restaurantId } = req.body;

        // Validate time range
        if (!timeRange.start || !timeRange.end) return res.status(400).json({ error: "Time range is required" });

        // Update menu details
        const menu = await Menu.findByIdAndUpdate(
            id,
            { title, shortTitle, description, timeRange, restaurantId },
            { new: true, runValidators: true }
        );
        if (!menu) return res.status(404).json({ error: 'Menu not found' });

        const existingCategoryIds = categories.map(cat => cat._id).filter(Boolean);
        const existingCategories = await Category.find({ menuId: id });
        const categoryIdsToDelete = existingCategories
            .filter(cat => !existingCategoryIds.includes(cat._id.toString()))
            .map(cat => cat._id);

        // Delete categories and their items if not in the update request
        await Category.deleteMany({ _id: { $in: categoryIdsToDelete } });
        await Item.deleteMany({ categoryId: { $in: categoryIdsToDelete } });

        // Update or create categories and items
        for (const categoryData of categories) {
            let category;
            if (categoryData._id) {
                // Update existing category
                category = await Category.findByIdAndUpdate(
                    categoryData._id,
                    { name: categoryData.name, description: categoryData.description, menuId: id, restaurantId },
                    { new: true, runValidators: true }
                );
            } else {
                // Create new category
                category = await Category.create({
                    name: categoryData.name,
                    description: categoryData.description,
                    menuId: id,
                    restaurantId
                });
            }

            const existingItemIds = categoryData.items.map(item => item._id).filter(Boolean);
            const existingItems = await Item.find({ categoryId: category._id });
            const itemIdsToDelete = existingItems
                .filter(item => !existingItemIds.includes(item._id.toString()))
                .map(item => item._id);

            // Delete items not in the update request
            await Item.deleteMany({ _id: { $in: itemIdsToDelete } });

            // Update or create items
            for (const itemData of categoryData.items) {
                if (itemData._id) {
                    // Update existing item
                    await Item.findByIdAndUpdate(
                        itemData._id,
                        {
                            title: itemData.title,
                            description: itemData.description,
                            price: itemData.price,
                            discountPrice: itemData.discountPrice,
                            availability: itemData.availability,
                            allergens: itemData.allergens,
                            restaurantId
                        },
                        { new: true, runValidators: true }
                    );
                } else {
                    // Create new item
                    await Item.create({
                        categoryId: category._id,
                        title: itemData.title,
                        description: itemData.description,
                        price: itemData.price,
                        discountPrice: itemData.discountPrice,
                        availability: itemData.availability,
                        allergens: itemData.allergens,
                        restaurantId
                    });
                }
            }
        }

        res.status(200).json({ message: 'Menu updated successfully', menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getMenusAvailableNow = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const currentTime = new Date();

        // Retrieve all menus for the given restaurant where the current time falls within the menu's time range
        const menus = await Menu.find({
            restaurantId,
            "timeRange.start": { $lte: currentTime },
            "timeRange.end": { $gte: currentTime }
        }).populate({
            path: 'categories',
            populate: { path: 'items' }
        });

        return res.json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Retrieve All Menus for a Specific Restaurant (Client/Admin)
const getAllMenusByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.user.restaurantId;
        const menus = await Menu.find({ restaurantId }).populate({
            path: 'categories',
            populate: { path: 'items' }
        });

        res.status(200).json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    createMenu,
    getMenuById,
    deleteMenu,
    updateMenu,
    getMenusAvailableNow,
    getAllMenusByRestaurant
};