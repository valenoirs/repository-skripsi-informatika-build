"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const skripsi_1 = require("../models/skripsi");
const user_1 = require("../models/user");
exports.router = (0, express_1.Router)();
exports.router.get('/skripsi/detail/:id', async (req, res) => {
    const { id } = req.params;
    const skripsi = await skripsi_1.Skripsi.findById(id);
    return res.render('user/detail', {
        layout: 'layout',
        notification: req.flash('notification'),
        skripsi,
        category: 'title',
        query: '',
    });
});
exports.router.get('/skripsi/search', async (req, res) => {
    const { category, query } = req.query;
    let skripsi;
    if (!category) {
        return res.redirect('/');
    }
    else if (category === 'title') {
        skripsi = await skripsi_1.Skripsi.find({
            title: { $regex: query, $options: 'i' },
        }).sort({ title: 1 });
    }
    else if (category === 'author') {
        skripsi = await skripsi_1.Skripsi.find({
            author: { $regex: query, $options: 'i' },
        }).sort({ author: 1 });
    }
    else if (category === 'year') {
        skripsi = await skripsi_1.Skripsi.find({
            year: { $regex: query, $options: 'i' },
        }).sort({ year: 1 });
    }
    return res.render('user/skripsi', {
        layout: 'layout',
        notification: req.flash('notification'),
        skripsi,
        category,
        query,
    });
});
exports.router.get('/user/search', async (req, res) => {
    if (!req.session.user && req.session.user.isAdmin)
        return res.redirect('/');
    const { category, column, query } = req.query;
    let pengguna;
    if (!category || !column) {
        return res.redirect('/');
    }
    else if (category === 'mahasiswa') {
        pengguna = await user_1.User.find({
            [column.toString()]: { $regex: query, $options: 'i' },
            isAdmin: false,
            isDosen: false,
        }).sort({ [column.toString()]: 1 });
    }
    else if (category === 'dosen') {
        pengguna = await user_1.User.find({
            [column.toString()]: { $regex: query, $options: 'i' },
            isAdmin: false,
            isDosen: true,
        }).sort({ [column.toString()]: 1 });
    }
    return res.render('user/user', {
        layout: 'layout',
        notification: req.flash('notification'),
        pengguna,
        category,
        column,
        query,
    });
});
exports.router.get('/password', async (req, res) => {
    if (!req.session.user)
        return res.redirect('/');
    return res.render('user/password', {
        layout: 'layout',
        notification: req.flash('notification'),
    });
});
exports.router.get('/', async (req, res) => {
    const skripsi = await skripsi_1.Skripsi.find().sort({ _id: -1 }).limit(4);
    const totalSkripsi = await skripsi_1.Skripsi.find().count();
    const totalUser = (await user_1.User.find().count()) - 1;
    if (req.session.user && req.session.user.isAdmin) {
        return res.render('user/admin', {
            layout: 'layout',
            notification: req.flash('notification'),
            skripsi,
            totalSkripsi,
            totalUser,
        });
    }
    return res.render('user/index', {
        layout: 'layout',
        notification: req.flash('notification'),
        skripsi,
    });
});
