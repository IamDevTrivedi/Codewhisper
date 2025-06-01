// controllers/user.controller.js


// custom logger
const logger = require('../lib/logger.lib.js');

// User model
const User = require('../models/user.model.js');
const File = require('../models/file.model.js');
const { v4 } = require('uuid');
const languages = require('../Constants/languages.js');


// User controller
const userController = {


    // getUserDetails controller
    getUserDetails: async (req, res) => {

        // log the request
        logger.post("/api/user/get-user-details");

        const { id } = req.body;

        try {

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, message: "User details fetched successfully", data: user });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // addFile controller
    addFile: async (req, res) => {

        logger.post("/api/user/add-file");

        const { id, fileFullName } = req.body;


        if (!id || !fileFullName) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }

        try {

            const exisitingUser = await User.findById(id);

            if (!exisitingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }


            const parts = fileFullName.split('.');
            const fileExtension = parts.pop();
            const fileName = parts.join('.');
            const fileId = v4();

            const selectedLanguage = languages.find((lang) => lang.extension === "." + fileExtension);

            if (!selectedLanguage) {
                return res.status(400).json({ success: false, message: "Unsupported file extension" });
            }

            const newFile = new File({
                fileName,
                fileExtension,
                fileFullName,
                fileId,
                fileLanguage: selectedLanguage.editorLanguage,
                fileContent: `// ${fileFullName} : created at ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' })}, ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`,
                fileOwner: id
            })

            await newFile.save();

            res.status(201).json({ success: true, message: "File created successfully", data: newFile });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // getFiles controller
    getFiles: async (req, res) => {

        logger.post("/api/user/get-files");
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "User id is required" });
        }


        try {
            const exisitingUser = await User.findById(id);

            if (!exisitingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const files = await File.find({ fileOwner: id });
            res.status(200).json({ success: true, message: "Files fetched successfully", data: files });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // deleteFile controller
    deleteFile: async (req, res) => {

        logger.post("/api/user/delete-file");
        const { id, fileId } = req.body;

        if (!id || !fileId) {
            return res.status(400).json({ success: false, message: "User id and file id is required" });
        }

        try {
            const exisitingUser = await User.findById(id);

            if (!exisitingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const file = await File.findOneAndDelete({ fileOwner: id, fileId });

            if (!file) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            res.status(200).json({ success: true, message: "File deleted successfully" });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // updateFile controller
    updateFile: async (req, res) => {

        logger.post("/api/user/update-file");
        const { id, fileId, fileContent } = req.body;

        if (!id || !fileId || !fileContent) {
            return res.status(400).json({ success: false, message: "User id, file id and file content is required" });
        }

        try {
            const exisitingUser = await User.findById(id);

            if (!exisitingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const updatedFile = await File.findOneAndUpdate({ fileOwner: id, fileId }, { fileContent }, { new: true });

            if (!updatedFile) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            res.status(200).json({ success: true, message: "File updated successfully", data: updatedFile });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // renameFile controller
    renameFile: async (req, res) => {

        logger.post("/api/user/rename-file");
        const { id, fileId, fileFullName } = req.body;

        if (!id || !fileId || !fileFullName) {
            return res.status(400).json({ success: false, message: "User id, file id and file full name is required" });
        }

        try {
            const exisitingUser = await User.findById(id);

            if (!exisitingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const parts = fileFullName.split('.');
            const fileExtension = parts.pop();
            const fileName = parts.join('.');

            const selectedLanguage = languages.find((lang) => lang.extension === "." + fileExtension);

            if (!selectedLanguage) {
                return res.status(400).json({ success: false, message: "Unsupported file extension" });
            }

            const updatedFile = await File.findOneAndUpdate({ fileOwner: id, fileId }, { fileFullName, fileName, fileExtension, fileLanguage: selectedLanguage.editorLanguage }, { new: true });

            if (!updatedFile) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            res.status(200).json({ success: true, message: "File renamed successfully", data: updatedFile });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = userController;