import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export function UploadFile(fieldName: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: (req, file, cb) => {
            cb(null, 'dist/uploads/');
          },
          filename: (req, file, cb) => {
            cb(null, `${uuidv4()}-${file.originalname}`);
          },
        }),
      }),
    ),
  );
}
