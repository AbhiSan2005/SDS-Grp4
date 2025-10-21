import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinary.js";

export const getEvents = async(req,res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createEvent = async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getEventById = async (req,res) =>{
    try {
        const {id} = req.params;
        const event = await Event.findById(id);
        if(!event)
            return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

