import Event from '../models/event.model.js'; 
import cloudinary from '../config/cloudinary.js'; 

const bufferToDataURI = (fileFormat, buffer) => {
    return `data:${fileFormat};base64,${buffer.toString('base64')}`;
}


export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ startDate: -1 });
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        let imageUrl = '';

        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: 'sds_events' 
            });
            imageUrl = result.secure_url;
        }

        const eventData = {
            ...req.body,
            imageUrl: imageUrl,
            gallery: Array.isArray(req.body.gallery) ? req.body.gallery : (req.body.gallery ? [req.body.gallery] : [])
        };

        const newEvent = new Event(eventData);
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: 'sds_events'
            });
            updateData.imageUrl = result.secure_url;
        } else {
             if (updateData.imageUrl === '') { 
             } else {
                 // Keep the existing image URL if no new file and imageUrl not cleared
                 // No need to delete updateData.imageUrl, findByIdAndUpdate handles it
             }
        }

         if (updateData.gallery && typeof updateData.gallery === 'string') {
            updateData.gallery = updateData.gallery.split('\n').map(url => url.trim()).filter(Boolean);
        } else if (updateData.gallery && !Array.isArray(updateData.gallery)) {
             updateData.gallery = [updateData.gallery]; // Ensure it's an array
         }


        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true 
        });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        

        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: error.message });
    }
};