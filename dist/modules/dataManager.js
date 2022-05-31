"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DataManager {
    static newLink(link, name) {
        const data = this.getData();
        const id = this.generateId();
        const newLink = {
            id,
            name: name || id,
            url: link,
            ips: []
        };
        data.push(newLink);
        this.writeData(data);
        return newLink;
    }
    static useLink(id, ip) {
        const data = this.getData();
        const index = data.findIndex(link => link.id === id);
        if (index === -1) {
            return undefined;
        }
        const link = data[index];
        if (link.ips.includes(ip)) {
            return undefined;
        }
        link.ips.push(ip);
        this.writeData(data);
        return link;
    }
    static generateId() {
        const data = this.getData();
        //6 character id
        const id = Math.random().toString(36).substr(2, 6);
        //check if id is unique
        if (data.find(link => link.id === id)) {
            return this.generateId();
        }
        return id;
    }
    static deleteLink(id) {
        const data = this.getData();
        const index = data.findIndex(link => link.id === id);
        const deleted = data.splice(index, 1);
        this.writeData(data);
        return deleted[0];
    }
    static getLink(id) {
        const data = this.getData();
        return data.find(link => link.id === id);
    }
    static getData() {
        if (!fs_1.default.existsSync(DataManager.DATA_FILE)) {
            this.writeData([]);
        }
        return JSON.parse(fs_1.default.readFileSync(DataManager.DATA_FILE, "utf8"));
    }
    static writeData(data) {
        fs_1.default.writeFileSync(DataManager.DATA_FILE, JSON.stringify(data, null, 4));
    }
}
exports.default = DataManager;
DataManager.DATA_FILE = path_1.default.resolve("./data/links.json");
