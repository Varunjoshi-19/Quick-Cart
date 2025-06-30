import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { fileTypeFromBuffer } from "file-type";

class OtherServices {

    #prisma = new PrismaClient();

    async renderImage(req: Request, res: Response) {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ errorMessage: "Missing userId" });
            return
        }

        try {
            const user = await this.#prisma.user.findUnique({
                where: { id: userId },
                select: { imageData: true }
            });

            if (!user || !user.imageData) {
                res.status(404).json({ errorMessage: "User image not found" });
                return;
            }

            // Detect content type dynamically from the buffer
            const type = await fileTypeFromBuffer(user.imageData);
            if (!type) {
                res.status(415).json({ errorMessage: "Unsupported image type" });
                return;
            }

            res.setHeader("Content-Type", type.mime);
            res.setHeader("Cache-Control", "no-store");
            res.end(user.imageData);
            
        } catch (error) {
            res.status(500).json({ errorMessage: "Failed to render image" });
        }
    }



}

export default new OtherServices;