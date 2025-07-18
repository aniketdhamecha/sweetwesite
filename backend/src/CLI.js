const SweetShop = require('./SweetShop.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

async function startCLI() {
  console.log('\n-----------------------------------\n');
  console.log('Welcome to the Sweet Shop CLI!');
  console.log('Available commands:');
  console.log('1. Add Sweet');
  console.log('2. Delete Sweet');
  console.log('3. Sort Sweets');
  console.log('4. Purchase Sweet');
  console.log('5. View All Sweets');
  console.log('6. Exit');
  console.log('\n-----------------------------------\n');

  const command = await ask('Enter a command: ');
  console.log('\n-----------------------------------');

  switch (command) {
    case '1': {
      console.log('Adding a new Sweet:');
      const sweet = {
        id: parseInt(await ask('Enter Sweet ID: ')),
        sweet_name: await ask('Enter Sweet Name: '),
        sweet_category: await ask('Enter Sweet Category: '),
        sweet_price: parseFloat(await ask('Enter Sweet Price: ')),
        sweet_quantity: parseInt(await ask('Enter Sweet Quantity: '))
      };
      SweetShop.addSweet(sweet);
      console.log('Sweet added successfully.');
      break;
    }
    case '2': {
      const id = parseInt(await ask('Enter Sweet ID to delete: '));
      SweetShop.deleteSweet(id);
      console.log('Sweet deleted successfully.');
      break;
    }
    case '3': {
      const key = await ask('Enter sort key (sweet_name, sweet_category, sweet_price): ');
      const order = await ask('Enter sort order (asc, desc): ');
      const sorted = SweetShop.sortSweet(key, order);
      console.log('\nSorted Sweets:');
      sorted.forEach((sweet) => {
        console.log(`ID: ${sweet.id}, Name: ${sweet.sweet_name}, Category: ${sweet.sweet_category}, Price: ${sweet.sweet_price}, Quantity: ${sweet.sweet_quantity}`);
      });
      break;
    }
    case '4': {
      const id = parseInt(await ask('Enter Sweet ID to purchase: '));
      const quantity = parseInt(await ask('Enter quantity to purchase: '));
      try {
        const purchasedSweet = SweetShop.purchaseSweet(id, quantity);
        console.log(`Purchased Sweet: ${purchasedSweet.sweet_name}, Quantity: ${purchasedSweet.quantity_purchased}, Total Price: ${purchasedSweet.total_price}`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
      break;
    }
    case '5': {
      console.log('\nAll Sweets:');
      const sweets = SweetShop.getAllSweets();
      sweets.forEach((sweet) => {
        console.log(`ID: ${sweet.id}, Name: ${sweet.sweet_name}, Category: ${sweet.sweet_category}, Price: ${sweet.sweet_price}, Quantity: ${sweet.sweet_quantity}`);
      });
      break;
    }
    case '6':
      console.log('Exiting Sweet Shop CLI. Goodbye!');
      rl.close();
      return;
    default:
      console.log('Invalid command. Please try again.');
  }

  startCLI();
}

startCLI();
