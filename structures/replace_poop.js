const Canvas = require("@napi-rs/canvas");

const replaceHouse_Poop = async function (client, ctx, home) {

/////////////////////////////////////////AAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////////////

          // 4A
    if (home.A_DATA.RA4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA4I}`);
        ctx.drawImage(a4, 119, 24, 121, 175);
    } 
    if (home.A_DATA.LA4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA4I}`);
        ctx.drawImage(a4, 119, 24, 121, 175);
    }

    // 4B

    if (home.B_DATA.RB4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB4I}`);
        ctx.drawImage(a4, 155, 41, 121, 175);
    }
    if (home.B_DATA.LB4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB4I}`);
        ctx.drawImage(a4, 155, 41, 121, 175);
    }

    // 4C

    if (home.C_DATA.RC4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC4I}`);
        ctx.drawImage(a4, 191, 59, 121, 175);
    }
    if (home.C_DATA.LC4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC4I}`);
        ctx.drawImage(a4, 191, 59, 121, 175);
    }

    // 4D
    if (home.D_DATA.RD4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD4I}`);
        ctx.drawImage(a4, 227, 77, 121, 175);
    }
    if (home.D_DATA.LD4I) {
        const a4 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD4I}`);
        ctx.drawImage(a4, 227, 77, 121, 175);
    }

    // 3A

    if (home.A_DATA.RA3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA3I}`);
        ctx.drawImage(a3, 82, 42, 121, 175);
    }
    if (home.A_DATA.LA3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA3I}`);
        ctx.drawImage(a3, 82, 42, 121, 175);
    }

    // 3B

    if (home.B_DATA.RB3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB3I}`);
        ctx.drawImage(a3, 118, 60, 121, 175);
    }
    if (home.B_DATA.LB3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB3I}`);
        ctx.drawImage(a3, 118, 60, 121, 175);
    }

    // 3C

    if (home.C_DATA.RC3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC3I}`);
        ctx.drawImage(a3, 154, 78, 121, 175);
    }
    if (home.C_DATA.LC3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC3I}`);
        ctx.drawImage(a3, 154, 78, 121, 175);
    }

    // 3D

    if (home.D_DATA.RD3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD3I}`);
        ctx.drawImage(a3, 190, 95, 121, 175);
    }
    if (home.D_DATA.LD3I) {
        const a3 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD3I}`);
        ctx.drawImage(a3, 190, 95, 121, 175);
    }

    // 2A

    if (home.A_DATA.RA2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA2I}`);
        ctx.drawImage(a2, 45, 61, 121, 175);
    }
    if (home.A_DATA.LA2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA2I}`);
        ctx.drawImage(a2, 45, 61, 121, 175);
    }

    // 2B

    if (home.B_DATA.RB2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB2I}`);
        ctx.drawImage(a2, 81, 79, 121, 175);
    }
    if (home.B_DATA.LB2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB2I}`);
        ctx.drawImage(a2, 81, 79, 121, 175);
    }

    // 2C

    if (home.C_DATA.RC2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC2I}`);
        ctx.drawImage(a2, 117, 96, 121, 175);
    }
    if (home.C_DATA.LC2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC2I}`);
        ctx.drawImage(a2, 117, 96, 121, 175);
    }

    // 2D
    if (home.D_DATA.RD2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD2I}`);
        ctx.drawImage(a2, 153, 113, 121, 175);
    } if (home.D_DATA.LD2I) {
        const a2 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD2I}`);
        ctx.drawImage(a2, 153, 113, 121, 175);
    }

    // 1A

    if (home.A_DATA.RA1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.RA1I}`);
        ctx.drawImage(a1, 8, 79, 121, 175);
    }
    if (home.A_DATA.LA1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.A_DATA.LA1I}`);
        ctx.drawImage(a1, 8, 79, 121, 175);
    }

    // 1B

    if (home.B_DATA.RB1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.RB1I}`);
        ctx.drawImage(a1, 44, 97, 121, 175);
    }
    if (home.B_DATA.LB1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.B_DATA.LB1I}`);
        ctx.drawImage(a1, 44, 97, 121, 175);
    }

    // 1C

    if (home.C_DATA.RC1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.RC1I}`);
        ctx.drawImage(a1, 80, 114, 121, 175);
    }
    if (home.C_DATA.LC1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.C_DATA.LC1I}`);
        ctx.drawImage(a1, 80, 114, 121, 175);
    }

    // 1D

    if (home.D_DATA.RD1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.RD1I}`);
        ctx.drawImage(a1, 116, 131, 121, 175);
    }
    if (home.D_DATA.LD1I) {
        const a1 = await Canvas.loadImage(`./assests/furniture/${home.D_DATA.LD1I}`);
        ctx.drawImage(a1, 116, 131, 121, 175);
    }

    
}

module.exports = { replaceHouse_Poop };