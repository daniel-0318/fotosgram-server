"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/create', (req, res) => {
    res.json({
        ok: true,
        mensaje: "todo funciona bien!"
    });
});
exports.default = userRoutes;
