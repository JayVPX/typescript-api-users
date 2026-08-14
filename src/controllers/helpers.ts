export const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const successRequest = (body: any) => {
  return { statusCode: 200, body };
};

export const createdRequest = (body: any) => {
  return { statusCode: 201, body };
};
