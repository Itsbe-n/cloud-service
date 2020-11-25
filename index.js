const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  token: process.env.TOKEN
});
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.TOKEN);
const express = require("express");
const app = express();
const fs = require("fs");
const mysql = require("mysql");


const dir = "../commands";

const discord_token = process.env.TOKEN;

manager.spawn();

var shardcount = manager.totalShards - 1;

manager.on("launch", shard =>
           console.log(
  `[SHARDING CLIENT] Shard ${shard.id + 1}/${manager.totalShards} lauched.`
)
          );

const http = require("http");
