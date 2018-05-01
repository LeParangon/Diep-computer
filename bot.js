// ==UserScript==
// @name         Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discordapp.com/channels/304310378387734529/330019835193065472
// @grant        none
// ==/UserScript==

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

var tank_list = ["b", "W", "FG", "TS", "WF", "O", "Q", "TA", "TA2", "B", "B2", "f", "f2", "f3", "A3", "A5", "TW", "PS", "T", "G", "AG", "AG2", "SL", "GT", "GT2", "AS", "AT", "AT2", "BS", "F", "F2", "SP", "SP2", "SN", "TR", "TT", "OT", "OT2", "MG", "SK", "SK2", "RO", "RO2", "SS", "SS2", "a", "R", "ST", "HU", "M", "P", "MT", "D", "H", "H2", "A", "OL", "OS", "N"];
var Df_list = [2.50, 1.625, 2.50, 1.75, 1.25, 1.625, 1.875, 2.50, 0.5, 2.50, 0.5, 2.50, 2, 0.5, 1, 1, 1.25, 1.50, 1.50, 1.250, 0.75, 1.25, 0.5, 2.50, 1.25, 0.75, 2.50, 0.75, 0.375, 1.75, 1, 1.75, 0.25, 2.50, 2.50, 2.50, 2.50, 1.75, 1.75, 2.50, 1.50, 2.50, 1.50, 2.50, 1.50, 2.50, 2.50, 2.50, 1.875, 1.75, 1.875, 4, 7.50, 7.50, 1.75, 7.50, 1.75, 1.75, 4.20];
var Pf_list = [0.40, 0.36, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.28, 0.18, 0.4, 0.18, 0.4, 0.8, 0.4, 0.4, 0.8, 0.4, 0.4, 1.60, 0.16, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.56, 0.4, 1.20, 0.12, 2, 0.12, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.4, 1.28, 0.8, 0.8, 0.56, 0.8, 0.8, 0.8, 0.2];
var X_list = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 22.50, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 45, 15, 15, 22.50, 15, 15, 45, 15, 8, 15, 22.50, 22.50, 22.50, 22.50, 90, 8, 59.9, 5.40, 59.9, 3, 30, 30, 30, 30, 30, 37.5, 45, 45, 49.5, 59.9, 59.9, 90, 59.9, 90, 90, 0];
var Number_barrel = [1, 2, 2, 3, 4, 8, 4, 1, 2, 1, 4, 1, 2, 2, 3, 5, 6, 5, 3, 4, 1, 4, 5, 1, 2, 1, 1, 1, 4, 1, 6, 1, 1, 1, 1, 3, 1, 2, 1, 1, 2, 1, 1, 1, 10, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 4, 2, 2];
var Kind_barrel = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2];
var basic_D = 0.4 * 2.5 * (0.7 + 0.3 * 7) * (1 + 0.75 * 7);
var basic_DPS = basic_D / 0.32;
var basic_test = false;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
client.on("message", (message) => {
    if (message.content.startsWith("!=help")) {
        message.channel.send("For health related stats, try *!=HP xxx* with the x being regen, max health and body damage stats. For bullets related stats, try *!= [tank acronym] xxx* with the x being penetration, damage and reload stats. Check out #acronyms to see the tank acronyms.");
    }
    if (message.content.startsWith("!=HP")) {
        var mots = message.content.split(" ");
        var stats = mots[1];

        var lvl = parseInt(mots[2]);
        if (isNaN(lvl)){
            lvl = 45;
        }
        if (mots[2] == "%" || mots[2] == "b" || mots[3] == "%" || mots[3] == "b" ){
            basic_test = true;
        }
        
        var regen_stat = parseInt(stats.substr(0,1));
        var HP_stat = parseInt(stats.substr(1,1));
        var BD_stat = parseInt(stats.substr(2,2));

        var DPL = 0;
        var MH = 0;
        var D = 0;
        var Regeneration = 0;

        if (basic_test){
            D = Math.round(10*(34.5 + 5 * HP_stat) * (1 + 0.2 * BD_stat) / basic_D) * 10;
        }
        if (!basic_test){
            DPL = Math.round(10*30 * (1 + 0.2 * BD_stat))/10;
            MH = Math.round(48 + 2 * lvl + 20 * HP_stat);
            D = Math.round(10*(34.5 + 5 * HP_stat) * (1 + 0.2 * BD_stat))/10;
            Regeneration = Math.round(1000*1/30 * D * (0.03 + regen_stat *  0.12))/1000;
        }

        var MH_string = MH.toString();
        var Regeneration_string = Regeneration.toString();
        var D_string = D.toString();
        var DPL_string = DPL.toString();

        var sentence = "";
        if (basic_test){
            sentence += "Durability = " + D_string + " %";
        }
        if (!basic_test){
            sentence += "Durability = " + D_string + " S    -    Health = " + MH_string + " HP    -    Regeneration = " + Regeneration_string + " S/s    -    DPL = " + DPL_string + " S/loop";
        }
        message.channel.send(sentence);
        }

    if (message.content.startsWith("!= ")) {
        var mots2 = message.content.split(" ");
        var stats2 = mots2[2];
        if (mots2.length>3){
            if (mots2[3] == "%" || mots2[3] == "b" ){
                basic_test = true;
            }
        }
        var tank = mots2[1];
        if (tank_list.includes(tank)){

            var bp = parseInt(stats2.substr(0,1));
            var dm = parseInt(stats2.substr(1,1));
            var br = parseInt(stats2.substr(2,2));

            var index = tank_list.indexOf(tank);
            var N_barrel = Kind_barrel[index];

            var bDPL = [];
            var bD = [];
            var bDPS = [];
            var bDPStot = [];
            var i;
            for (i = 0; i < N_barrel; i++) {
                var Pf = Pf_list[index+i];
                var Df = Df_list[index+i];
                var Bf = Df * Pf;
                var X = X_list[index+i];

                var reload =  1/(0.04 * Math.round(X / Math.pow(1.875,(br/7))));
                var BP = 20 * Pf * (1 + 0.75 * bp);  //BP is bullet HP

                if (!basic_test){
                    bDPL.push(4 * Df * (0.7 + 0.3 *dm));
                    bD.push(Bf * (0.7 + 0.3 * dm) * (1 + 0.75 * bp));
                    bDPS.push(bD[i] * reload);
                    bDPStot.push(Number_barrel[index+i] * bD[i] * reload);
                }
                if (basic_test){
                    bDPL.push(4 * Df * (0.7 + 0.3 *dm));
                    bD.push(Bf * (0.7 + 0.3 * dm) * (1 + 0.75 * bp) / basic_D * 100);
                    bDPS.push(bD[i] * reload * basic_D / basic_DPS );
                    bDPStot.push(Number_barrel[index+i] * bD[i] * reload * basic_D / basic_DPS );
                }
            }
            var DPStot = Math.round(100*bDPStot.reduce(reducer))/100;


            var bD_string = "";
            var bDPL_string = "";
            var bDPS_string = "";
            for (i = 0; i < N_barrel; i++) {
                if (Number_barrel[index+i] == 1) {
                    bD_string += "**" + (Math.round(10*bD[i])/10).toString()+ "**";
                    bDPL_string += "**" + (Math.round(10*bDPL[i])/10).toString() + "**";
                    bDPS_string += "**" + (Math.round(10*bDPS[i])/10).toString() + "**";
                }
                if (Number_barrel[index+i] > 1) {
                    bD_string += Number_barrel[index+i].toString() + " * **" + (Math.round(10*bD[i])/10).toString() + "**";
                    bDPL_string += Number_barrel[index+i].toString() + " * **" + (Math.round(10*bDPL[i])/10).toString() + "**";
                    bDPS_string += Number_barrel[index+i].toString() + " * **" + (Math.round(10*bDPS[i])/10).toString() + "**";
                }
                if (i+1<N_barrel){
                    bD_string += " + ";
                    bDPL_string += " + ";
                    bDPS_string += " + ";
                }

            }

            

            if (!basic_test){
                var bsentence1 = "Bullet durability = " + bD_string + " S";
                var bsentence2 = "Bullet DPL = " + bDPL_string + " S/loop";
                var bsentence3 = "";
                if (N_barrel>1){
                    bsentence3 += "DPS = " + bDPS_string + " S/s = " + "**" + DPStot.toString() + "**" + " S/s";
                }
                if (N_barrel==1){
                    bsentence3 += "DPS = " + bDPS_string + " S/s";
                }
                message.channel.send(bsentence1);
                message.channel.send(bsentence2);
                message.channel.send(bsentence3);
            }
            if (basic_test){
                var bsentence = "";
                if (N_barrel>1 || Number_barrel[index]>1){
                    bsentence += "Bullet durability = " + bD_string + " %   -   " + "DPS = " + bDPS_string + " % = " + "**" + DPStot.toString() + "**" + " %";
                }
                if (N_barrel==1 && Number_barrel[index]==1){
                    bsentence += "Bullet durability = " + bD_string + " %   -   " + "DPS = " + bDPS_string + " %";
                }
                message.channel.send(bsentence);
            }

        }
        if (!tank_list.includes(tank)){
            message.channel.send("Gid gud");
        }
    }
    basic_test = false;
});
client.login(process.env.BOT_TOKEN);
