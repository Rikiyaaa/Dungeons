const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const GInv = require("../../settings/models/inventory.js");
const HInv = require("../../settings/models/houseinv.js");
const { Page_1, Page_2, Page_3, Page_4, Page_5, Page_6, Page_7, Page_8, Page_9, Page_10, 
        Page_11, Page_12,  Page_13, Page_14, Page_15, Page_16, Page_17, Page_18, Page_19, Page_20,
        Page_21, Page_22, Page_23, Page_24, Page_25, Page_26, Page_27, Page_28, Page_29, Page_30, 
        Page_31, Page_32,  Page_33, Page_34, Page_35, Page_36, Page_37, Page_38, Page_39, Page_40,
        Page_41, Page_42, Page_43, Page_44, Page_45, Page_46, Page_47, Page_48, Page_49, Page_50, 
        Page_51, Page_52,  Page_53, Page_54, Page_55, Page_56, Page_57,   } = require("../../settings/Item_shop/furniture.js");

const shopFurniture = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');



        //this returns the values
        const object1 = Object.values(Page_1);
        const object2 = Object.values(Page_2);
        const object3 = Object.values(Page_3);
        const object4 = Object.values(Page_4);
        const object5 = Object.values(Page_5);
        const object6 = Object.values(Page_6);
        const object7 = Object.values(Page_7);
        const object8 = Object.values(Page_8);
        const object9 = Object.values(Page_9);
        const object10 = Object.values(Page_10);
        const object11 = Object.values(Page_11);
        const object12 = Object.values(Page_12);
        const object13 = Object.values(Page_13);
        const object14 = Object.values(Page_14);
        const object15 = Object.values(Page_15);
        const object16 = Object.values(Page_16);
        const object17 = Object.values(Page_17);
        const object18 = Object.values(Page_18);
        const object19 = Object.values(Page_19);
        const object20 = Object.values(Page_20);
        const object21 = Object.values(Page_21);
        const object22 = Object.values(Page_22);
        const object23 = Object.values(Page_23);
        const object24 = Object.values(Page_24);
        const object25 = Object.values(Page_25);
        const object26 = Object.values(Page_26);
        const object27 = Object.values(Page_27);
        const object28 = Object.values(Page_28);
        const object29 = Object.values(Page_29);
        const object30 = Object.values(Page_30);
        const object31 = Object.values(Page_31);
        const object32 = Object.values(Page_32);
        const object33 = Object.values(Page_33);
        const object34 = Object.values(Page_34);
        const object35 = Object.values(Page_35);
        const object36 = Object.values(Page_36);
        const object37 = Object.values(Page_37);
        const object38 = Object.values(Page_38);
        const object39 = Object.values(Page_39);
        const object40 = Object.values(Page_40);
        const object41 = Object.values(Page_41);
        const object42 = Object.values(Page_42);
        const object43 = Object.values(Page_43);
        const object44 = Object.values(Page_44);
        const object45 = Object.values(Page_45);
        const object46 = Object.values(Page_46);
        const object47 = Object.values(Page_47);
        const object48 = Object.values(Page_48);
        const object49 = Object.values(Page_49);
        const object50 = Object.values(Page_50);
        const object51 = Object.values(Page_51);
        const object52 = Object.values(Page_52);
        const object53 = Object.values(Page_53);
        const object54 = Object.values(Page_54);
        const object55 = Object.values(Page_55);
        const object56 = Object.values(Page_56);
        const object57 = Object.values(Page_57);
      
        const itemsPerPage = 5; // number of items to display per page
        let currentPage = 0; // Initialize the current page to the first page

        

        const generateMenuOptions1 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object1.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions2 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object2.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions3 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object3.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions4 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object4.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions5 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object5.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions6 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object6.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions7 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object7.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions8 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object8.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions9 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object9.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions10 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object10.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions11 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object11.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions12 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object12.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions13 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object13.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions14 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object14.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions15 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object15.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions16 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object16.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions17 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object17.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions18 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object18.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions19 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object19.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions20 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object20.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions21 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object21.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions22 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object22.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions23 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object23.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions24 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object24.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions25 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object25.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions26 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object26.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions27 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object27.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions28 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object28.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions29 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object29.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions30 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object30.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions31 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object31.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions32 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object32.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions33 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object33.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions34 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object34.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions35 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object35.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions36 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object36.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions37 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object37.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions38 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object38.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions39 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object39.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions40 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object40.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions41 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object41.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions42 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object42.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions43 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object43.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions44 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object44.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions45 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object45.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions46 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object46.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions47 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object47.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions48 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object48.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions49 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object49.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions50 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object50.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions51 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object51.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions52 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object52.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);
            });
        };

        const generateMenuOptions53 = () => {
            // generate options for the select menu based on the current page
            const pageItems = object53.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            return pageItems.map(key => {
                return new SelectMenuOptionBuilder()
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            });
        };

        const generateMenuOptions54 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object54.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions55 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object55.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions56 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object56.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const generateMenuOptions57 = () => {
            // generate options for the select menu based on the current page   
            const pageItems = object57.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
            return pageItems.map(key => {   
                return new SelectMenuOptionBuilder()    
                    .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                    .setValue(key.name);    
            }); 
        };

        const row1 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_furniture1")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions1())
            ]);

        const row2 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture2")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions2()) 
            ]); 

        const row3 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture3")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions3()) 
            ]); 

        const row4 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture4")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions4())
            ]);

        const row5 = new ActionRowBuilder()
        .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture5")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions5())
            ]);
    
        const row6 = new ActionRowBuilder()
        .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture6")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions6()) 
            ]); 
    
        const row7 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture7")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions7()) 
            ]); 
    
        const row8 = new ActionRowBuilder() 
        .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture8")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions8())
            ]);

        const row9 = new ActionRowBuilder() 
        .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture9")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions9()) 
            ]); 
    
        const row10 = new ActionRowBuilder() 
        .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture10")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions10())
            ]);

            const row11 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture11")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions11())
                ]);
    
            const row12 = new ActionRowBuilder()
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture12")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions12()) 
                ]); 
    
            const row13 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture13")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions13()) 
                ]); 
    
            const row14 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture14")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions14())
                ]);
    
                const row15 = new ActionRowBuilder()
                .addComponents([
                    new StringSelectMenuBuilder()
                        .setCustomId("shop_furniture15")
                        .setPlaceholder(`Please selection item to buy.`)
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu
                        .setOptions(generateMenuOptions15())
                    ]);
        
                const row16 = new ActionRowBuilder()
                .addComponents([    
                    new StringSelectMenuBuilder()   
                        .setCustomId("shop_furniture16")
                        .setPlaceholder(`Please selection item to buy.`)    
                        .setMaxValues(1)    
                        .setMinValues(1)    
                        /// Map the categories to the select menu   
                        .setOptions(generateMenuOptions16()) 
                    ]); 
        
                const row17 = new ActionRowBuilder() 
                .addComponents([    
                    new StringSelectMenuBuilder()   
                        .setCustomId("shop_furniture17")
                        .setPlaceholder(`Please selection item to buy.`)    
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu   
                        .setOptions(generateMenuOptions17()) 
                    ]); 
        
                const row18 = new ActionRowBuilder() 
                .addComponents([
                    new StringSelectMenuBuilder()   
                        .setCustomId("shop_furniture18")
                        .setPlaceholder(`Please selection item to buy.`)    
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu
                        .setOptions(generateMenuOptions18())
                    ]);
    
                    const row19 = new ActionRowBuilder() 
                .addComponents([    
                    new StringSelectMenuBuilder()   
                        .setCustomId("shop_furniture19")
                        .setPlaceholder(`Please selection item to buy.`)    
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu   
                        .setOptions(generateMenuOptions19()) 
                    ]); 
        
                const row20 = new ActionRowBuilder() 
                .addComponents([
                    new StringSelectMenuBuilder()   
                        .setCustomId("shop_furniture20")
                        .setPlaceholder(`Please selection item to buy.`)    
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu
                        .setOptions(generateMenuOptions20())
                    ]);

                    const row21 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_furniture21")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions21())
            ]);

        const row22 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture22")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions22()) 
            ]); 

        const row23 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture23")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions23()) 
            ]); 

        const row24 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture24")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions24())
            ]);

            const row25 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture25")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions25())
                ]);
    
            const row26 = new ActionRowBuilder()
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture26")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions26()) 
                ]); 
    
            const row27 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture27")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions27()) 
                ]); 
    
            const row28 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture28")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions28())
                ]);

                const row29 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture29")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions29()) 
                ]); 
    
            const row30 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture30")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions30())
                ]);

                const row31 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_furniture31")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions31())
            ]);

        const row32 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture32")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions32()) 
            ]); 

        const row33 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture33")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions33()) 
            ]); 

        const row34 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture34")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions34())
            ]);

            const row35 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture35")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions35())
                ]);
    
            const row36 = new ActionRowBuilder()
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture36")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions36()) 
                ]); 
    
            const row37 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture37")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions37()) 
                ]); 
    
            const row38 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture38")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions38())
                ]);

                const row39 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture39")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions39()) 
                ]); 
    
            const row40 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture40")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions40())
                ]);

                const row41 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_furniture41")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions41())
            ]);

        const row42 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture42")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions42()) 
            ]); 

        const row43 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture43")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions43()) 
            ]); 

        const row44 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture44")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions44())
            ]);

            const row45 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture45")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions45())
                ]);
    
            const row46 = new ActionRowBuilder()
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture46")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions46()) 
                ]); 
    
            const row47 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture47")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions47()) 
                ]); 
    
            const row48 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture48")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions48())
                ]);

                const row49 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture49")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions49()) 
                ]); 
    
            const row50 = new ActionRowBuilder() 
            .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture50")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions50())
                ]);

                const row51 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_furniture51")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions51())
            ]);

        const row52 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture52")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions52()) 
            ]); 

        const row53 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture53")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions53()) 
            ]); 

        const row54 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture54")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions54())
            ]);

            const row55 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_furniture55")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions55())
                ]);
    
            const row56 = new ActionRowBuilder()
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture56")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions56()) 
                ]); 
    
            const row57 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_furniture57")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions57()) 
                ]); 

            //create button     
        const button = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                .setCustomId("shop_furniture_prev10")
                .setLabel("Previous 10")
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder() 
                    .setCustomId("shop_furniture_prev")
                    .setLabel("Previous")   
                    .setStyle(ButtonStyle.Danger)   ,
                new ButtonBuilder() 
                    .setCustomId("shop_furniture_next")
                    .setLabel("Next")   
                    .setStyle(ButtonStyle.Danger),
                // create button next 10 pages
                new ButtonBuilder()
                    .setCustomId("shop_furniture_next10")
                    .setLabel("Next 10")
                    .setStyle(ButtonStyle.Danger),
                // create button previous 10 pages
                // create button next 100 pages
            ]);

       

        const canvas1 = Canvas.createCanvas(450, 300);
        const ctx1 = canvas1.getContext("2d");
        const shop1 = await Canvas.loadImage("./assests/shop/one.png");
        ctx1.drawImage(shop1, 0, 0, canvas1.width, canvas1.height);
        const attc1 = new AttachmentBuilder(await canvas1.encode("png"), { name: `one.png` })

        const canvas2 = Canvas.createCanvas(450, 300);
        const ctx2 = canvas2.getContext("2d");
        const shop2 = await Canvas.loadImage("./assests/shop/one.png");
        ctx2.drawImage(shop2, 0, 0, canvas2.width, canvas2.height);
        const attc2 = new AttachmentBuilder(await canvas2.encode("png"), { name: `one.png` })

        const canvas3 = Canvas.createCanvas(450, 300);
        const ctx3 = canvas3.getContext("2d");
        const shop3 = await Canvas.loadImage("./assests/shop/one.png");
        ctx3.drawImage(shop3, 0, 0, canvas3.width, canvas3.height);
        const attc3 = new AttachmentBuilder(await canvas3.encode("png"), { name: `one.png` })

        const canvas4 = Canvas.createCanvas(450, 300);
        const ctx4 = canvas4.getContext("2d");
        const shop4 = await Canvas.loadImage("./assests/shop/one.png");
        ctx4.drawImage(shop4, 0, 0, canvas4.width, canvas4.height);
        const attc4 = new AttachmentBuilder(await canvas4.encode("png"), { name: `one.png` })

        const canvas5 = Canvas.createCanvas(450, 300);
        const ctx5 = canvas5.getContext("2d");
        const shop5 = await Canvas.loadImage("./assests/shop/one.png");
        ctx5.drawImage(shop5, 0, 0, canvas5.width, canvas5.height);
        const attc5 = new AttachmentBuilder(await canvas5.encode("png"), { name: `one.png` })

        const canvas6 = Canvas.createCanvas(450, 300);
        const ctx6 = canvas6.getContext("2d");
        const shop6 = await Canvas.loadImage("./assests/shop/one.png");
        ctx6.drawImage(shop6, 0, 0, canvas6.width, canvas6.height);
        const attc6 = new AttachmentBuilder(await canvas6.encode("png"), { name: `one.png` })

        const canvas7 = Canvas.createCanvas(450, 300);
        const ctx7 = canvas7.getContext("2d");
        const shop7 = await Canvas.loadImage("./assests/shop/one.png");
        ctx7.drawImage(shop7, 0, 0, canvas7.width, canvas7.height);
        const attc7 = new AttachmentBuilder(await canvas7.encode("png"), { name: `one.png` })

        const canvas8 = Canvas.createCanvas(450, 300);
        const ctx8 = canvas8.getContext("2d");
        const shop8 = await Canvas.loadImage("./assests/shop/one.png");
        ctx8.drawImage(shop8, 0, 0, canvas8.width, canvas8.height);
        const attc8= new AttachmentBuilder(await canvas8.encode("png"), { name: `one.png` })

        const canvas9 = Canvas.createCanvas(450, 300);
        const ctx9 = canvas9.getContext("2d");
        const shop9 = await Canvas.loadImage("./assests/shop/one.png");
        ctx9.drawImage(shop9, 0, 0, canvas9.width, canvas9.height);
        const attc9 = new AttachmentBuilder(await canvas9.encode("png"), { name: `one.png` })

        const canvas10 = Canvas.createCanvas(450, 300);
        const ctx10 = canvas10.getContext("2d");
        const shop10 = await Canvas.loadImage("./assests/shop/one.png");
        ctx10.drawImage(shop10, 0, 0, canvas10.width, canvas10.height);
        const attc10 = new AttachmentBuilder(await canvas10.encode("png"), { name: `one.png` })

        const canvas11 = Canvas.createCanvas(450, 300);
        const ctx11 = canvas11.getContext("2d");
        const shop11 = await Canvas.loadImage("./assests/shop/one.png");
        ctx11.drawImage(shop11, 0, 0, canvas11.width, canvas11.height);
        const attc11 = new AttachmentBuilder(await canvas11.encode("png"), { name: `one.png` })

        const canvas12 = Canvas.createCanvas(450, 300);
        const ctx12 = canvas12.getContext("2d");
        const shop12 = await Canvas.loadImage("./assests/shop/one.png");
        ctx12.drawImage(shop12, 0, 0, canvas12.width, canvas12.height);
        const attc12 = new AttachmentBuilder(await canvas12.encode("png"), { name: `one.png` })

        const canvas13 = Canvas.createCanvas(450, 300);
        const ctx13 = canvas13.getContext("2d");
        const shop13 = await Canvas.loadImage("./assests/shop/one.png");
        ctx13.drawImage(shop13, 0, 0, canvas13.width, canvas13.height);
        const attc13 = new AttachmentBuilder(await canvas13.encode("png"), { name: `one.png` })

        const canvas14 = Canvas.createCanvas(450, 300);
        const ctx14 = canvas14.getContext("2d");
        const shop14 = await Canvas.loadImage("./assests/shop/one.png");
        ctx14.drawImage(shop14, 0, 0, canvas14.width, canvas14.height);
        const attc14 = new AttachmentBuilder(await canvas14.encode("png"), { name: `one.png` })

        const canvas15 = Canvas.createCanvas(450, 300);
        const ctx15 = canvas15.getContext("2d");
        const shop15 = await Canvas.loadImage("./assests/shop/one.png");
        ctx15.drawImage(shop15, 0, 0, canvas15.width, canvas15.height); 
        const attc15 = new AttachmentBuilder(await canvas15.encode("png"), { name: `one.png` })

        const canvas16 = Canvas.createCanvas(450, 300); 
        const ctx16 = canvas16.getContext("2d");
        const shop16 = await Canvas.loadImage("./assests/shop/one.png");
        ctx16.drawImage(shop16, 0, 0, canvas16.width, canvas16.height);
        const attc16 = new AttachmentBuilder(await canvas16.encode("png"), { name: `one.png` })

        const canvas17 = Canvas.createCanvas(450, 300);
        const ctx17 = canvas17.getContext("2d");
        const shop17 = await Canvas.loadImage("./assests/shop/one.png");
        ctx17.drawImage(shop17, 0, 0, canvas17.width, canvas17.height);
        const attc17 = new AttachmentBuilder(await canvas17.encode("png"), { name: `one.png` })

        const canvas18 = Canvas.createCanvas(450, 300);
        const ctx18 = canvas18.getContext("2d");
        const shop18 = await Canvas.loadImage("./assests/shop/one.png");
        ctx18.drawImage(shop18, 0, 0, canvas18.width, canvas18.height);
        const attc18 = new AttachmentBuilder(await canvas18.encode("png"), { name: `one.png` })

        const canvas19 = Canvas.createCanvas(450, 300);
        const ctx19 = canvas19.getContext("2d");
        const shop19 = await Canvas.loadImage("./assests/shop/one.png");
        ctx19.drawImage(shop19, 0, 0, canvas19.width, canvas19.height);
        const attc19 = new AttachmentBuilder(await canvas19.encode("png"), { name: `one.png` })

        const canvas20 = Canvas.createCanvas(450, 300);
        const ctx20 = canvas20.getContext("2d");
        const shop20 = await Canvas.loadImage("./assests/shop/one.png");
        ctx20.drawImage(shop20, 0, 0, canvas20.width, canvas20.height);
        const attc20 = new AttachmentBuilder(await canvas20.encode("png"), { name: `one.png` })

        const canvas21 = Canvas.createCanvas(450, 300);
        const ctx21 = canvas21.getContext("2d");
        const shop21 = await Canvas.loadImage("./assests/shop/one.png");
        ctx21.drawImage(shop21, 0, 0, canvas21.width, canvas21.height);
        const attc21 = new AttachmentBuilder(await canvas21.encode("png"), { name: `one.png` })

        const canvas22 = Canvas.createCanvas(450, 300);
        const ctx22 = canvas22.getContext("2d");
        const shop22 = await Canvas.loadImage("./assests/shop/one.png");
        ctx22.drawImage(shop22, 0, 0, canvas22.width, canvas22.height);
        const attc22 = new AttachmentBuilder(await canvas22.encode("png"), { name: `one.png` })

        const canvas23 = Canvas.createCanvas(450, 300);
        const ctx23 = canvas23.getContext("2d");
        const shop23 = await Canvas.loadImage("./assests/shop/one.png");
        ctx23.drawImage(shop23, 0, 0, canvas23.width, canvas23.height);
        const attc23 = new AttachmentBuilder(await canvas23.encode("png"), { name: `one.png` })

        const canvas24 = Canvas.createCanvas(450, 300);
        const ctx24 = canvas24.getContext("2d");
        const shop24 = await Canvas.loadImage("./assests/shop/one.png");
        ctx24.drawImage(shop24, 0, 0, canvas24.width, canvas24.height);
        const attc24 = new AttachmentBuilder(await canvas24.encode("png"), { name: `one.png` })

        const canvas25 = Canvas.createCanvas(450, 300);
        const ctx25 = canvas25.getContext("2d");
        const shop25 = await Canvas.loadImage("./assests/shop/one.png");
        ctx25.drawImage(shop25, 0, 0, canvas25.width, canvas25.height);
        const attc25 = new AttachmentBuilder(await canvas25.encode("png"), { name: `one.png` })

        const canvas26 = Canvas.createCanvas(450, 300);
        const ctx26 = canvas26.getContext("2d");
        const shop26 = await Canvas.loadImage("./assests/shop/one.png");
        ctx26.drawImage(shop26, 0, 0, canvas26.width, canvas26.height);
        const attc26 = new AttachmentBuilder(await canvas26.encode("png"), { name: `one.png` })

        const canvas27 = Canvas.createCanvas(450, 300);
        const ctx27 = canvas27.getContext("2d");
        const shop27 = await Canvas.loadImage("./assests/shop/one.png");
        ctx27.drawImage(shop27, 0, 0, canvas7.width, canvas27.height);
        const attc27 = new AttachmentBuilder(await canvas27.encode("png"), { name: `one.png` })

        const canvas28 = Canvas.createCanvas(450, 300);
        const ctx28 = canvas28.getContext("2d");
        const shop28 = await Canvas.loadImage("./assests/shop/one.png");
        ctx28.drawImage(shop28, 0, 0, canvas28.width, canvas28.height);
        const attc28= new AttachmentBuilder(await canvas28.encode("png"), { name: `one.png` })

        const canvas29 = Canvas.createCanvas(450, 300);
        const ctx29 = canvas29.getContext("2d");
        const shop29 = await Canvas.loadImage("./assests/shop/one.png");
        ctx29.drawImage(shop29, 0, 0, canvas29.width, canvas29.height);
        const attc29 = new AttachmentBuilder(await canvas29.encode("png"), { name: `one.png` })

        const canvas30 = Canvas.createCanvas(450, 300);
        const ctx30 = canvas30.getContext("2d");
        const shop30 = await Canvas.loadImage("./assests/shop/one.png");
        ctx30.drawImage(shop30, 0, 0, canvas30.width, canvas30.height);
        const attc30 = new AttachmentBuilder(await canvas30.encode("png"), { name: `one.png` })

        const canvas31 = Canvas.createCanvas(450, 300);
        const ctx31 = canvas31.getContext("2d");
        const shop31 = await Canvas.loadImage("./assests/shop/one.png");
        ctx31.drawImage(shop31, 0, 0, canvas31.width, canvas31.height);
        const attc31 = new AttachmentBuilder(await canvas31.encode("png"), { name: `one.png` })

        const canvas32 = Canvas.createCanvas(450, 300);
        const ctx32 = canvas32.getContext("2d");
        const shop32 = await Canvas.loadImage("./assests/shop/one.png");
        ctx32.drawImage(shop32, 0, 0, canvas32.width, canvas32.height);
        const attc32 = new AttachmentBuilder(await canvas22.encode("png"), { name: `one.png` })

        const canvas33 = Canvas.createCanvas(450, 300);
        const ctx33 = canvas33.getContext("2d");
        const shop33 = await Canvas.loadImage("./assests/shop/one.png");
        ctx33.drawImage(shop33, 0, 0, canvas33.width, canvas33.height);
        const attc33 = new AttachmentBuilder(await canvas33.encode("png"), { name: `one.png` })

        const canvas34 = Canvas.createCanvas(450, 300);
        const ctx34 = canvas34.getContext("2d");
        const shop34 = await Canvas.loadImage("./assests/shop/one.png");
        ctx34.drawImage(shop34, 0, 0, canvas34.width, canvas34.height);
        const attc34 = new AttachmentBuilder(await canvas34.encode("png"), { name: `one.png` })

        const canvas35 = Canvas.createCanvas(450, 300);
        const ctx35 = canvas35.getContext("2d");
        const shop35 = await Canvas.loadImage("./assests/shop/one.png");
        ctx35.drawImage(shop35, 0, 0, canvas35.width, canvas35.height);
        const attc35 = new AttachmentBuilder(await canvas35.encode("png"), { name: `one.png` })

        const canvas36 = Canvas.createCanvas(450, 300);
        const ctx36 = canvas36.getContext("2d");
        const shop36 = await Canvas.loadImage("./assests/shop/one.png");
        ctx36.drawImage(shop36, 0, 0, canvas36.width, canvas36.height);
        const attc36 = new AttachmentBuilder(await canvas36.encode("png"), { name: `one.png` })

        const canvas37 = Canvas.createCanvas(450, 300);
        const ctx37 = canvas37.getContext("2d");
        const shop37 = await Canvas.loadImage("./assests/shop/one.png");
        ctx37.drawImage(shop37, 0, 0, canvas37.width, canvas37.height);
        const attc37 = new AttachmentBuilder(await canvas37.encode("png"), { name: `one.png` })

        const canvas38 = Canvas.createCanvas(450, 300);
        const ctx38 = canvas38.getContext("2d");
        const shop38 = await Canvas.loadImage("./assests/shop/one.png");
        ctx38.drawImage(shop38, 0, 0, canvas38.width, canvas38.height);
        const attc38= new AttachmentBuilder(await canvas38.encode("png"), { name: `one.png` })

        const canvas39 = Canvas.createCanvas(450, 300);
        const ctx39 = canvas39.getContext("2d");
        const shop39 = await Canvas.loadImage("./assests/shop/one.png");
        ctx39.drawImage(shop39, 0, 0, canvas39.width, canvas39.height);
        const attc39 = new AttachmentBuilder(await canvas39.encode("png"), { name: `one.png` })

        const canvas40 = Canvas.createCanvas(450, 300);
        const ctx40 = canvas40.getContext("2d");
        const shop40 = await Canvas.loadImage("./assests/shop/one.png");
        ctx40.drawImage(shop40, 0, 0, canvas40.width, canvas40.height);
        const attc40 = new AttachmentBuilder(await canvas40.encode("png"), { name: `one.png` })

        const canvas41 = Canvas.createCanvas(450, 300);
        const ctx41 = canvas41.getContext("2d");
        const shop41 = await Canvas.loadImage("./assests/shop/one.png");
        ctx41.drawImage(shop41, 0, 0, canvas41.width, canvas41.height);
        const attc41 = new AttachmentBuilder(await canvas41.encode("png"), { name: `one.png` })

        const canvas42 = Canvas.createCanvas(450, 300);
        const ctx42 = canvas42.getContext("2d");
        const shop42 = await Canvas.loadImage("./assests/shop/one.png");
        ctx42.drawImage(shop42, 0, 0, canvas42.width, canvas42.height);
        const attc42 = new AttachmentBuilder(await canvas42.encode("png"), { name: `one.png` })

        const canvas43 = Canvas.createCanvas(450, 300);
        const ctx43 = canvas43.getContext("2d");
        const shop43 = await Canvas.loadImage("./assests/shop/one.png");
        ctx43.drawImage(shop43, 0, 0, canvas43.width, canvas43.height);
        const attc43 = new AttachmentBuilder(await canvas3.encode("png"), { name: `one.png` })

        const canvas44 = Canvas.createCanvas(450, 300);
        const ctx44 = canvas44.getContext("2d");
        const shop44 = await Canvas.loadImage("./assests/shop/one.png");
        ctx44.drawImage(shop44, 0, 0, canvas44.width, canvas44.height);
        const attc44 = new AttachmentBuilder(await canvas44.encode("png"), { name: `one.png` })

        const canvas45 = Canvas.createCanvas(450, 300);
        const ctx45 = canvas45.getContext("2d");
        const shop45 = await Canvas.loadImage("./assests/shop/one.png");
        ctx45.drawImage(shop45, 0, 0, canvas45.width, canvas45.height);
        const attc45 = new AttachmentBuilder(await canvas45.encode("png"), { name: `one.png` })

        const canvas46 = Canvas.createCanvas(450, 300);
        const ctx46 = canvas46.getContext("2d");
        const shop46 = await Canvas.loadImage("./assests/shop/one.png");
        ctx46.drawImage(shop46, 0, 0, canvas46.width, canvas46.height);
        const attc46 = new AttachmentBuilder(await canvas46.encode("png"), { name: `one.png` })

        const canvas47 = Canvas.createCanvas(450, 300);
        const ctx47 = canvas47.getContext("2d");
        const shop47 = await Canvas.loadImage("./assests/shop/one.png");
        ctx47.drawImage(shop47, 0, 0, canvas47.width, canvas47.height);
        const attc47 = new AttachmentBuilder(await canvas47.encode("png"), { name: `one.png` })

        const canvas48 = Canvas.createCanvas(450, 300);
        const ctx48 = canvas48.getContext("2d");
        const shop48 = await Canvas.loadImage("./assests/shop/one.png");
        ctx48.drawImage(shop48, 0, 0, canvas48.width, canvas48.height);
        const attc48= new AttachmentBuilder(await canvas48.encode("png"), { name: `one.png` })

        const canvas49 = Canvas.createCanvas(450, 300);
        const ctx49 = canvas49.getContext("2d");
        const shop49 = await Canvas.loadImage("./assests/shop/one.png");
        ctx49.drawImage(shop49, 0, 0, canvas49.width, canvas49.height);
        const attc49 = new AttachmentBuilder(await canvas49.encode("png"), { name: `one.png` })

        const canvas50 = Canvas.createCanvas(450, 300);
        const ctx50 = canvas50.getContext("2d");
        const shop50 = await Canvas.loadImage("./assests/shop/one.png");
        ctx50.drawImage(shop50, 0, 0, canvas50.width, canvas50.height);
        const attc50 = new AttachmentBuilder(await canvas50.encode("png"), { name: `one.png` })

        const canvas51 = Canvas.createCanvas(450, 300);
        const ctx51 = canvas51.getContext("2d");
        const shop51 = await Canvas.loadImage("./assests/shop/one.png");
        ctx51.drawImage(shop51, 0, 0, canvas51.width, canvas51.height);
        const attc51 = new AttachmentBuilder(await canvas51.encode("png"), { name: `one.png` })

        const canvas52 = Canvas.createCanvas(450, 300);
        const ctx52 = canvas52.getContext("2d");
        const shop52 = await Canvas.loadImage("./assests/shop/one.png");
        ctx52.drawImage(shop52, 0, 0, canvas52.width, canvas52.height);
        const attc52 = new AttachmentBuilder(await canvas52.encode("png"), { name: `one.png` })

        const canvas53 = Canvas.createCanvas(450, 300);
        const ctx53 = canvas53.getContext("2d");
        const shop53 = await Canvas.loadImage("./assests/shop/one.png");
        ctx53.drawImage(shop53, 0, 0, canvas53.width, canvas53.height);
        const attc53 = new AttachmentBuilder(await canvas53.encode("png"), { name: `one.png` })

        const canvas54 = Canvas.createCanvas(450, 300);
        const ctx54 = canvas54.getContext("2d");
        const shop54 = await Canvas.loadImage("./assests/shop/one.png");
        ctx54.drawImage(shop54, 0, 0, canvas54.width, canvas54.height);
        const attc54 = new AttachmentBuilder(await canvas54.encode("png"), { name: `one.png` })

        const canvas55 = Canvas.createCanvas(450, 300);
        const ctx55 = canvas55.getContext("2d");
        const shop55 = await Canvas.loadImage("./assests/shop/one.png");
        ctx55.drawImage(shop55, 0, 0, canvas55.width, canvas55.height);
        const attc55 = new AttachmentBuilder(await canvas55.encode("png"), { name: `one.png` })

        const canvas56 = Canvas.createCanvas(450, 300);
        const ctx56 = canvas56.getContext("2d");
        const shop56 = await Canvas.loadImage("./assests/shop/one.png");
        ctx56.drawImage(shop56, 0, 0, canvas56.width, canvas56.height);
        const attc56 = new AttachmentBuilder(await canvas56.encode("png"), { name: `one.png` })

        const canvas57 = Canvas.createCanvas(450, 300);
        const ctx57 = canvas57.getContext("2d");
        const shop57 = await Canvas.loadImage("./assests/shop/one.png");
        ctx57.drawImage(shop57, 0, 0, canvas57.width, canvas57.height);
        const attc57 = new AttachmentBuilder(await canvas57.encode("png"), { name: `one.png` })

        const embed = new EmbedBuilder()
            .setImage("attachment://one.png")
            .setColor(client.color)

        await msg.edit({ content: "Page 1", embeds: [embed], components: [row1, button], files: [attc1] });

        const pages = [];
        const attcs = [  
          [attc1, row1],
          [attc2, row2],
          [attc3, row3],
          [attc4, row4],
          [attc5, row5],
          [attc6, row6],
          [attc7, row7],
            [attc8, row8],
            [attc9, row9],
            [attc10, row10],
            [attc11, row11],
            [attc12, row12],
            [attc13, row13],
            [attc14, row14],
            [attc15, row15],
            [attc16, row16],
            [attc17, row17],
            [attc18, row18],
            [attc19, row19],
            [attc20, row20],
            [attc21, row21],
            [attc22, row22],
            [attc23, row23],
            [attc24, row24],
            [attc25, row25],
            [attc26, row26],
            [attc27, row27],
            [attc28, row28],
            [attc29, row29],
            [attc30, row30],
            [attc31, row31],
            [attc32, row32],
            [attc33, row33],
            [attc34, row34],
            [attc35, row35],
            [attc36, row36],
            [attc37, row37],
            [attc38, row38],
            [attc39, row39],
            [attc40, row40],
            [attc41, row41],
            [attc42, row42],
            [attc43, row43],
            [attc44, row44],
            [attc45, row45],
            [attc46, row46],
            [attc47, row47],
            [attc48, row48],
            [attc49, row49],
            [attc50, row50],
            [attc51, row51],
            [attc52, row52],
            [attc53, row53],
            [attc54, row54],
            [attc55, row55],
            [attc56, row56],
            [attc57, row57],

        ];
        
        for (let i = 0; i < attcs.length; i++) {
          const [attc, component] = attcs[i];
          pages.push({
            content: `Page ${i + 1}`,
            components: [component, button],
            files: [attc],
          });
        }

        const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });

        collector.on('collect', async (menu) => {
            if(menu.isSelectMenu()) {
                if(menu.customId === "shop_furniture1") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_1.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture2") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_2.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture3") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_3.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture4") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_4.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture5") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_5.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture6") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_6.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture7") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_7.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }   else if(menu.customId === "shop_furniture8") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_8.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture9") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_9.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture10") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_10.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture11") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_11.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture12") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_12.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture13") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_13.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture14") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_14.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture15") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_15.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture16") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_16.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture17") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_17.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture18") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_18.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture19") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_19.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture20") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_20.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture21") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_21.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture22") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_22.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture23") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_23.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture24") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_24.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture25") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_25.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture26") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_26.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture27") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_27.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture28") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_28.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture29") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_29.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture30") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_30.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture31") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_31.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture32") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_32.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture33") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_33.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture34") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_34.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture35") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_35.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture36") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_36.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture37") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_37.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture38") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_38.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture39") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_39.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture40") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_40.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture41") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_41.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture42") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_42.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture43") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_43.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture44") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_44.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture45") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_45.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture46") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_46.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture47") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_47.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture48") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_48.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture49") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_49.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture50") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_50.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture51") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_51.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture52") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_52.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture53") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_53.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture54") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_54.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }  else if(menu.customId === "shop_furniture55") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_55.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture56") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_56.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                } else if(menu.customId === "shop_furniture57") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = Page_57.find(x => x.name === directory);
                    

                    if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                    if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                    if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                    profile.money -= item.price;

                    const GenID = generateID();


                    hinv.furniture_left.push({
                        name: item.name,
                        type: item.type,
                        side: "left",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    hinv.furniture_right.push({
                        name: item.name,
                        type: item.type,
                        side: "right",
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    inv.item.push({
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        level: item.level,
                        area: item.area,
                        id: GenID
                    });

                    const embed = new EmbedBuilder()
                        .setDescription("You Successafully to buy " + item.name)
                        .setColor(client.color)

                    await profile.save();
                    await inv.save();
                    await hinv.save();

                    await menu.followUp({ embeds: [embed], components: [], files: [] });
                }
            } else if (menu.isButton()) {
                await menu.deferUpdate();
                if (menu.customId === "shop_furniture_next") {
                    currentPage++;
                    if (currentPage >= pages.length) currentPage = pages.length - 1;
                } else if (menu.customId === "shop_furniture_prev") {
                    currentPage--;
                    if (currentPage < 0) currentPage = 0;
                } else if (menu.customId === "shop_furniture_next10") {
                    currentPage += 10;
                    if (currentPage >= pages.length) currentPage = pages.length - 1;
                } else if (menu.customId === "shop_furniture_prev10") {
                    currentPage -= 10;
                    if (currentPage < 0) currentPage = 0;
                }

                const embed = new EmbedBuilder()
                .setDescription(pages[currentPage].content)
                .setColor(client.color);
        
                await msg.edit({
                    content: pages[currentPage].content,
                    embeds: [embed],
                    components: pages[currentPage].components,
                    files: pages[currentPage].files,
                });
            }
        });

}

function Commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
};

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};

module.exports = { shopFurniture };