// Function to generate a random UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to generate a random name
function generateRandomName(): string {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Hannah',
    'Ian',
    'Jasmine',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

// Create an array of 5 objects with random UUIDs and random names
export const generateArrayOfObjects = (length = 5): TUser[] =>
  Array.from({ length }, (): TUser => {
    return {
      uuid: generateUUID(),
      name: generateRandomName(),
    };
  });

console.log(generateArrayOfObjects());

export type TUser = {
  uuid: string;
  name: string;
};
