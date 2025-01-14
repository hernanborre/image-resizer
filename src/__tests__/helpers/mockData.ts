export const mockTask = {
  taskId: '123e4567-e89b-12d3-a456-426614174000',
  status: 'pending',
  price: 25,
  originalPath: '/input/test-image.jpg',
  images: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockFile = {
  fieldname: 'image',
  originalname: 'test-image.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '/tmp/uploads',
  filename: 'test-image.jpg',
  path: '/tmp/uploads/test-image.jpg',
  size: 12345
}; 