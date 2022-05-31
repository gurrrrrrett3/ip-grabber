import fs from "fs"
import path from "path"

export interface Link {
    id: string
    name: string
    url: string,
    ips: string[]
}

export default class DataManager {

    public static readonly DATA_FILE = path.resolve("./data/links.json")

    public static newLink(link: string, name?: string ): Link {
        const data = this.getData()
        const id = this.generateId()
        const newLink: Link = {
            id,
            name: name || id,
            url: link,
            ips: []
        }
        data.push(newLink)
        this.writeData(data)
        return newLink
    }

    public static useLink(id: string, ip: string): Link | undefined {
        const data = this.getData()
        const index = data.findIndex(link => link.id === id)
        if (index === -1) {
            return undefined
        }
        const link = data[index]
        if (link.ips.includes(ip)) {
            return undefined
        }
        link.ips.push(ip)
        this.writeData(data)
        return link
    }

    private static generateId(): string {
        const data = this.getData()
        //6 character id
        const id = Math.random().toString(36).substr(2, 6)
        //check if id is unique
        if (data.find(link => link.id === id)) {
            return this.generateId()
        }
        return id
    }

    public static deleteLink(id: string): Link {
        const data = this.getData()
        const index = data.findIndex(link => link.id === id)
        const deleted = data.splice(index, 1)
        this.writeData(data)
        return deleted[0]
    }

    public static getLink(id: string): Link | undefined {
        const data = this.getData()
        return data.find(link => link.id === id)
    }

    public static getData(): Link[] {
        if (!fs.existsSync(DataManager.DATA_FILE)) {
            this.writeData([])
        }
        return JSON.parse(fs.readFileSync(DataManager.DATA_FILE, "utf8"))
    }

    public static writeData(data: Link[]) {
        fs.writeFileSync(DataManager.DATA_FILE, JSON.stringify(data, null, 4))
    }
}