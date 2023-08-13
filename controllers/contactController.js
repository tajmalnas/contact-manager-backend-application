const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    if (!name || !email) {
        res.status(400).json({ error: "Name and email are required" });
    }

    const contact = await Contact.create({ name, email, phone,user_id: req.user.id });

    res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ contact });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ error: "Contact not found" });
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("You are not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ updateContact });
});

const deleteContact = asyncHandler(async (req, res) => {
    
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        res.status(404).json({ error: "Contact not found" });
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("You are not authorized to update this contact");
    }
    
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
