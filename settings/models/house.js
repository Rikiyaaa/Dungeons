const { Schema, model } = require('mongoose');

const Create = Schema({
    guild: String,
    user: String,
    house: String,
    six_clock: Boolean,
    nineteen_clock: Boolean,
    /// Furniture
    A_DATA: {
        RA1: Boolean,
        RA1I: String,
        RA1D: Boolean,
        ///
        RA2: Boolean,
        RA2I: String,
        RA2D: Boolean,
        ///
        RA3: Boolean,
        RA3I: String,
        RA3D: Boolean,
        ///
        RA4: Boolean,
        RA4I: String,
        RA4D: Boolean,

        LA1: Boolean,
        LA1I: String,
        LA1D: Boolean,

        LA2: Boolean,
        LA2I: String,
        LA2D: Boolean,

        LA3: Boolean,
        LA3I: String,
        LA3D: Boolean,

        LA4: Boolean,
        LA4I: String,
        LA4D: Boolean


    },
    /// Furniture
    B_DATA: {
        RB1: Boolean,
        RB1I: String,
        RB1D: Boolean,
        ///
        RB2: Boolean,
        RB2I: String,
        RB2D: Boolean,
        ///
        RB3: Boolean,
        RB3I: String,
        RB3D: Boolean,
        ///
        RB4: Boolean,
        RB4I: String,
        RB4D: Boolean,

        LB1: Boolean,
        LB1I: String,
        LB1D: Boolean,

        LB2: Boolean,
        LB2I: String,
        LB2D: Boolean,

        LB3: Boolean,
        LB3I: String,
        LB3D: Boolean,

        LB4: Boolean,
        LB4I: String,
        LB4D: Boolean

    },
    /// Furniture
    C_DATA: {
        RC1: Boolean,
        RC1I: String,
        RC1D: Boolean,
        ///
        RC2: Boolean,
        RC2I: String,
        RC2D: Boolean,
        ///
        RC3: Boolean,
        RC3I: String,
        RC3D: Boolean,
        ///
        RC4: Boolean,
        RC4I: String,
        RC4D: Boolean,

        LC1: Boolean,
        LC1I: String,
        LC1D: Boolean,

        LC2: Boolean,
        LC2I: String,
        LC2D: Boolean,

        LC3: Boolean,
        LC3I: String,
        LC3D: Boolean,

        LC4: Boolean,
        LC4I: String,
        LC4D: Boolean
        
    },
    /// Furniture
    D_DATA: {
        RD1: Boolean,
        RD1I: String,
        RD1D: Boolean,
        ///
        RD2: Boolean,
        RD2I: String,
        RD2D: Boolean,
        ///
        RD3: Boolean,
        RD3I: String,
        RD3D: Boolean,
        ///
        RD4: Boolean,
        RD4I: String,
        RD4D: Boolean,

        LD1: Boolean,
        LD1I: String,
        LD1D: Boolean,

        LD2: Boolean,
        LD2I: String,
        LD2D: Boolean,

        LD3: Boolean,
        LD3I: String,
        LD3D: Boolean,

        LD4: Boolean,
        LD4I: String,
        LD4D: Boolean

        
    },
    /// Floor
    FLOOR_DATA: {
        FLOOR: Boolean,
        FLOORI: String,
        FLOORD: Boolean
    },
    TILE_DATA: {
        TILE: Boolean,
        TILEI: String,
        TILED: Boolean
    },
    /// Wallpapers
    WALL_DATA: {
        L1: Boolean,
        L1I: String,
        L1D: Boolean,
        ///
        L2: Boolean,
        L2I: String,
        L2D: Boolean,
        ///
        L3: Boolean,
        L3I: String,
        L3D: Boolean,
        ///
        L4: Boolean,
        L4I: String,
        L4D: Boolean,
        ///
        R1: Boolean,
        R1I: String,
        R1D: Boolean,
        ///
        R2: Boolean,
        R2I: String,
        R2D: Boolean,
        ///
        R3: Boolean,
        R3I: String,
        R3D: Boolean,
        ///
        R4: Boolean,
        R4I: String,
        R4D: Boolean,
    }
});

module.exports = model('houses', Create);

