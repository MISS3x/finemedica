
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/lib/data.json');
const PUBLIC_DATA_FILE = path.join(process.cwd(), 'public/data.json');

async function writeData(data: any) {
    try {
        const json = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(DATA_FILE, json, 'utf8');
        await fs.promises.writeFile(PUBLIC_DATA_FILE, json, 'utf8');
        return true;
    } catch (e) {
        console.error("Error writing data:", e);
        return false;
    }
}

async function readData() {
    try {
        const fileContents = await fs.promises.readFile(DATA_FILE, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        try {
            const publicFileContents = await fs.promises.readFile(PUBLIC_DATA_FILE, 'utf8');
            return JSON.parse(publicFileContents);
        } catch (e2) {
            return null;
        }
    }
}

export async function GET() {
    const data = await readData();
    if (!data) return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const success = await writeData(body);
        if (success) {
            return NextResponse.json({ success: true, data: body });
        } else {
            return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
        }
    } catch (e: any) {
        return NextResponse.json({ error: 'Failed to save data', details: e.message }, { status: 500 });
    }
}
