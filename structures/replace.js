const Canvas = require("@napi-rs/canvas");

const replaceHouse = async function (client, interaction, ctx, home, check) {
    // Floor
    if (home.FLOOR_DATA.FLOORI) {
        const floor = await Canvas.loadImage(`./assests/floor/${home.FLOOR_DATA.FLOORI}_floor.png`);
        ctx.drawImage(floor, 0, 0, 300, 300); 
    }

    if (home.TILE_DATA.TILEI) {
        const tile = await Canvas.loadImage(`./assests/tile/${home.TILE_DATA.TILEI}_tile.png`);
        ctx.drawImage(tile, 0, 0, 300, 300); 
    }

    if (home.house) {
        const house = await Canvas.loadImage(`./assests/windows.png`);
        ctx.drawImage(house, 0, 0, 300, 300); 
    }

    if (home.six_clock === true) {
        const six_clock = await Canvas.loadImage("./assests/windows_mooning.png");
        ctx.drawImage(six_clock, 0, 0, 300, 300);
    } else if (home.nineteen_clock === true) {
        const nineteen_clock = await Canvas.loadImage("./assests/windows_night.png");
        ctx.drawImage(nineteen_clock, 0, 0, 300, 300);
    }
    // Wall
    //// Left



    /// RL 4
    if (home.WALL_DATA.L1I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.L1I}_left.png`);
        ctx.drawImage(place, 6, 88, 37, 57)
    }
    if (home.WALL_DATA.L2I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.L2I}_left.png`);
        ctx.drawImage(place, 43, 71, 37, 57)
    }
    if (home.WALL_DATA.L3I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.L3I}_left.png`);
        ctx.drawImage(place, 79, 51, 37, 57)
    }
    if (home.WALL_DATA.L4I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.L4I}_left.png`);
        ctx.drawImage(place, 114, 32, 37, 57)
    }
    ///// Right
    if (home.WALL_DATA.R1I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.R1I}_right.png`);
        ctx.drawImage(place, 150, 34, 37, 57)
    }
    if (home.WALL_DATA.R2I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.R2I}_right.png`);
        ctx.drawImage(place, 187, 51, 37, 57)
    }
    if (home.WALL_DATA.R3I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.R3I}_right.png`);
        ctx.drawImage(place, 222, 72, 37, 57)
    }
    if (home.WALL_DATA.R4I) {
        const place = await Canvas.loadImage(`./assests/wallpaper/${home.WALL_DATA.R4I}_right.png`);
        ctx.drawImage(place, 258, 98, 37, 57)
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////AAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////////////

          // 4A
    if (home.A_DATA.RA4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA4I}_left.png`);
        ctx.drawImage(a4, 119, 24, 121, 175);
    } 
    if (home.A_DATA.LA4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA4I}_right.png`);
        ctx.drawImage(a4, 119, 24, 121, 175);
    }

    // 4B

    if (home.B_DATA.RB4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB4I}_left.png`);
        ctx.drawImage(a4, 155, 41, 121, 175);
    }
    if (home.B_DATA.LB4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB4I}_right.png`);
        ctx.drawImage(a4, 155, 41, 121, 175);
    }

    // 4C

    if (home.C_DATA.RC4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC4I}_left.png`);
        ctx.drawImage(a4, 191, 59, 121, 175);
    }
    if (home.C_DATA.LC4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC4I}_right.png`);
        ctx.drawImage(a4, 191, 59, 121, 175);
    }

    // 4D
    if (home.D_DATA.RD4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD4I}_left.png`);
        ctx.drawImage(a4, 227, 77, 121, 175);
    }
    if (home.D_DATA.LD4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD4I}_right.png`);
        ctx.drawImage(a4, 227, 77, 121, 175);
    }

    // 3A

    if (home.A_DATA.RA3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA3I}_left.png`);
        ctx.drawImage(a3, 82, 42, 121, 175);
    }
    if (home.A_DATA.LA3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA3I}_right.png`);
        ctx.drawImage(a3, 82, 42, 121, 175);
    }

    // 3B

    if (home.B_DATA.RB3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB3I}_left.png`);
        ctx.drawImage(a3, 118, 60, 121, 175);
    }
    if (home.B_DATA.LB3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB3I}_right.png`);
        ctx.drawImage(a3, 118, 60, 121, 175);
    }

    // 3C

    if (home.C_DATA.RC3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC3I}_left.png`);
        ctx.drawImage(a3, 154, 78, 121, 175);
    }
    if (home.C_DATA.LC3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC3I}_right.png`);
        ctx.drawImage(a3, 154, 78, 121, 175);
    }

    // 3D

    if (home.D_DATA.RD3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD3I}_left.png`);
        ctx.drawImage(a3, 190, 95, 121, 175);
    }
    if (home.D_DATA.LD3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD3I}_right.png`);
        ctx.drawImage(a3, 190, 95, 121, 175);
    }

    // 2A

    if (home.A_DATA.RA2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA2I}_left.png`);
        ctx.drawImage(a2, 45, 61, 121, 175);
    }
    if (home.A_DATA.LA2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA2I}_right.png`);
        ctx.drawImage(a2, 45, 61, 121, 175);
    }

    // 2B

    if (home.B_DATA.RB2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB2I}_left.png`);
        ctx.drawImage(a2, 81, 79, 121, 175);
    }
    if (home.B_DATA.LB2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB2I}_right.png`);
        ctx.drawImage(a2, 81, 79, 121, 175);
    }

    // 2C

    if (home.C_DATA.RC2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC2I}_left.png`);
        ctx.drawImage(a2, 117, 96, 121, 175);
    }
    if (home.C_DATA.LC2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC2I}_right.png`);
        ctx.drawImage(a2, 117, 96, 121, 175);
    }

    // 2D
    if (home.D_DATA.RD2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD2I}_left.png`);
        ctx.drawImage(a2, 153, 113, 121, 175);
    } if (home.D_DATA.LD2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD2I}_right.png`);
        ctx.drawImage(a2, 153, 113, 121, 175);
    }

    // 1A

    if (home.A_DATA.RA1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA1I}_left.png`);
        ctx.drawImage(a1, 8, 79, 121, 175);
    }
    if (home.A_DATA.LA1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA1I}_right.png`);
        ctx.drawImage(a1, 8, 79, 121, 175);
    }

    // 1B

    if (home.B_DATA.RB1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB1I}_left.png`);
        ctx.drawImage(a1, 44, 97, 121, 175);
    }
    if (home.B_DATA.LB1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB1I}_right.png`);
        ctx.drawImage(a1, 44, 97, 121, 175);
    }

    // 1C

    if (home.C_DATA.RC1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC1I}_left.png`);
        ctx.drawImage(a1, 80, 114, 121, 175);
    }
    if (home.C_DATA.LC1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC1I}_right.png`);
        ctx.drawImage(a1, 80, 114, 121, 175);
    }

    // 1D

    if (home.D_DATA.RD1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD1I}_left.png`);
        ctx.drawImage(a1, 116, 131, 121, 175);
    }
    if (home.D_DATA.LD1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD1I}_right.png`);
        ctx.drawImage(a1, 116, 131, 121, 175);
    }

    
}

module.exports = { replaceHouse };