import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth(
        // This configures JWT Bearer authentication
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'header',
        },
        'Bearer',
    )
    .addTag('blogs')
    .build();
