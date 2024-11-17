const Room = require('../models/Rooms');

const createRooms = async (req, res) => {
    try {
        const { floors } = req.body; // Expecting an array of floors with `from` and `to` ranges
        const restaurantId = req.user.restaurantId;

        // Validate input
        if (!floors || !Array.isArray(floors) || floors.length === 0) {
            return res.status(400).json({ error: 'Invalid input: floors data is required' });
        }

        let floorNum = 1;
        const newFloors = [];

        for (const floor of floors) {
            if (!floor.from || !floor.to || floor.from >= floor.to) {
                return res.status(400).json({ error: 'Invalid floor range' });
            }

            const room = await Room.create({
                restaurantId,
                floor: floorNum,
                rooms: [{ from: floor.from, to: floor.to }],
            });

            newFloors.push(room);

            floorNum++;
            room.save();
        }

        res.status(201).json({ message: 'Rooms created successfully', rooms: newFloors });
    } catch (error) {
        console.error('Error creating rooms:', error);
        res.status(400).json({ error: 'Failed to create rooms', details: error.message });
    }
};

const getRooms = async (req, res) => {
    try {
        let { restaurantId } = req.params;

        if (!restaurantId) {
            if (!req.user || !req.user.restaurantId) {
                return res.status(400).json({ error: 'Restaurant ID is required' });
            }
            restaurantId = req.user.restaurantId;
        }

        const rooms = await Room.find({ restaurantId });
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { floor, rooms } = req.body;
        const restaurantId = req.user.restaurantId;

        const updatedRoom = await Room.findOneAndUpdate(
            { _id: id, restaurantId },
            { floor, rooms },
            { new: true }
        );

        if (!updatedRoom) return res.status(404).json({ error: 'Room not found' });

        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(400).json({ error: 'Failed to update room', details: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantId = req.user.restaurantId;

        const deletedRoom = await Room.findOneAndDelete({ _id: id, restaurantId });

        if (!deletedRoom) return res.status(404).json({ error: 'Room not found' });

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Failed to delete room' });
    }
};

module.exports = {
    createRooms,
    getRooms,
    updateRoom,
    deleteRoom,
};