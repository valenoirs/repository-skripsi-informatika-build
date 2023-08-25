"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.edit = exports.remove = exports.upload = void 0;
const skripsi_1 = require("../models/skripsi");
const size_1 = require("../public/js/size");
const upload = async (req, res) => {
    try {
        const { title, year } = req.body;
        if (!req.file) {
            req.flash('notification', 'Format file yang di upload tidak sesuai.');
            console.log('[SERVER]: Incorrect file format.');
            return res.redirect('/');
        }
        if (req.file.size > size_1.MAX_FILE_SIZE * 1024 * 1024) {
            req.flash('notification', 'File yang diupload terlalu besar.');
            console.log('[SERVER]: The file is too big');
            return res.redirect('back');
        }
        const skripsi = await skripsi_1.Skripsi.findOne({ title });
        if (skripsi) {
            req.flash('notification', 'Skripsi dengan judul yang sama telah terdaftar.');
            console.log('[SERVER]: Skripsi with same title found.');
            return res.redirect('/');
        }
        if (year > 2023) {
            req.flash('notification', 'Tahun lebih besar dari tahun ini.');
            console.log('[SERVER]: Incorrect year.');
            return res.redirect('/');
        }
        req.body.uri = `/upload/skripsi/${req.file?.filename}`;
        req.body.admin = req.session.user.name;
        await new skripsi_1.Skripsi(req.body).save();
        req.flash('notification', 'Skripsi berhasil diupload.');
        console.log('[SERVER]: New skripsi uploaded.');
        return res.redirect('/');
    }
    catch (error) {
        req.flash('notification', 'Terjadi kesalahan saat proses upload skripsi, coba lagi.');
        console.error('[SERVER]: Skripsi upload error.', error);
        return res.redirect('/');
    }
};
exports.upload = upload;
const remove = async (req, res) => {
    try {
        const { id } = req.body;
        const skripsi = await skripsi_1.Skripsi.findById(id);
        if (!skripsi) {
            req.flash('notification', 'Skripsi tidak ditemukan.');
            console.log('[SERVER]: Skripsi not found.');
            return res.redirect('/');
        }
        await skripsi_1.Skripsi.findByIdAndDelete(id);
        req.flash('notification', 'Skripsi berhasil dihapus.');
        console.log('[SERVER]: Skripsi deleted.');
        return res.redirect('/');
    }
    catch (error) {
        req.flash('notification', 'Terjadi kesalahan saat menghapus skripsi, coba lagi.');
        console.error('[SERVER]: Skripsi delete error.', error);
        return res.redirect('/');
    }
};
exports.remove = remove;
const edit = async (req, res) => {
    try {
        const { id, year } = req.body;
        const skripsi = await skripsi_1.Skripsi.findById(id);
        if (year > 2023) {
            req.flash('notification', 'Tahun lebih besar dari tahun ini.');
            console.log('[SERVER]: Incorrect year.');
            return res.redirect('back');
        }
        if (!skripsi) {
            req.flash('notification', 'Skripsi tidak ditemukan.');
            console.log('[SERVER]: Skripsi not found.');
            return res.redirect('back');
        }
        await skripsi_1.Skripsi.findByIdAndUpdate(id, { $set: req.body });
        req.flash('notification', 'Skripsi berhasil diperbarui.');
        console.log('[SERVER]: Skripsi edited.');
        return res.redirect('back');
    }
    catch (error) {
        req.flash('notification', 'Terjadi kesalahan saat memperbarui skripsi, coba lagi.');
        console.error('[SERVER]: Skripsi edit error.', error);
        return res.redirect('/');
    }
};
exports.edit = edit;
const search = async (req, res) => {
    try {
        const { category, query } = req.body;
        if (category === 'title') {
            return res.redirect(`/skripsi/search?category=${category}&query=${query}`);
        }
        if (category === 'author') {
            return res.redirect(`/skripsi/search?category=${category}&query=${query}`);
        }
        if (category === 'year') {
            return res.redirect(`/skripsi/search?category=${category}&query=${query}`);
        }
    }
    catch (error) {
        req.flash('notification', 'Terjadi kesalahan saat melakukan pencarian, coba lagi.');
        console.error('[SERVER]: Skripsi search error.', error);
        return res.redirect('/');
    }
};
exports.search = search;
