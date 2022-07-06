import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponse } from '../response/common-response';

type SchemaType = 'primitiveType' | 'object' | 'array';

export const ApiCommonResponse = (
  schemaType: SchemaType,
  dto: Type<unknown>,
) => {
  switch (schemaType) {
    case 'primitiveType': {
      return applyDecorators(
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
      break;
    }
    case 'object': {
      return applyDecorators(
        ApiExtraModels(dto),
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
      break;
    }
    case 'array': {
      return applyDecorators(
        ApiExtraModels(dto),
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
