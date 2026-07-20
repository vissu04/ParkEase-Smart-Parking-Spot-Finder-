package com.infosys.ParkEasy.Util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

public class QRCodeGenerator {

    public static String generateQRCode(String text) throws Exception {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix matrix = writer.encode(text, BarcodeFormat.QR_CODE, 250, 250);

        BufferedImage image = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < 250; x++) {
            for (int y = 0; y < 250; y++) {
                image.setRGB(x, y, matrix.get(x, y) ? 0x000000 : 0xFFFFFF);
            }
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);

        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }
}