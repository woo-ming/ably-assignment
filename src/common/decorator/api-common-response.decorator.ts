import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponse } from '../response/common-response';

type SchemaType = 'primitiveType' | 'object' | 'array';

export const ApiCommonResponse = ({
  schemaType,
  dto,
  isAuth,
  description,
}: {
  schemaType: SchemaType;
  dto: Type<unknown>;
  isAuth?: boolean;
  description?: string;
}) => {
  switch (schemaType) {
    case 'primitiveType': {
      return applyDecorators(
        ApiOperation({
          description: description ?? '',
          security: isAuth ? [{ bearerAuth: [] }] : [],
        }),
        ApiOkResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(CommonResponse) },
              {
                properties: {
                  data: {
                    type: typeof dto,
                  },
                },
              },
            ],
          },
        }),
      );
    }
    case 'object': {
      return applyDecorators(
        ApiExtraModels(dto),
        ApiOperation({
          description: description ?? '',
          security: isAuth ? [{ bearerAuth: [] }] : [],
        }),
        ApiOkResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(CommonResponse) },
              {
                properties: {
                  data: {
                    $ref: getSchemaPath(dto),
                  },
                },
              },
            ],
          },
        }),
      );
    }
    case 'array': {
      return applyDecorators(
        ApiExtraModels(dto),
        ApiOperation({
          description: description ?? '',
          security: isAuth ? [{ bearerAuth: [] }] : [],
        }),
        ApiOkResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(CommonResponse) },
              {
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(dto),
                    },
                  },
                },
              },
            ],
          },
        }),
      );
    }
  }
};
