class SweetShop{
    constructor(){
        this.sweets = [];
    }
    addSweet(sweet){
        // Validate sweet object
        if(!sweet || !sweet.id || !sweet.sweet_name || !sweet.sweet_category || !sweet.sweet_price || !sweet.sweet_quantity){
            throw new Error('Invalid sweet object');
        }

        // Validate price and quantity
        if(sweet.sweet_price < 0 || sweet.sweet_quantity < 0){
            throw new Error('Sweet price and quantity must be non-negative');
        }

        // If sweet already exists, just increase the quantity
        if(this.sweets.some((s) => (s.id === sweet.id) && (s.sweet_name === sweet.sweet_name) && (s.sweet_category === sweet.sweet_category) && (s.sweet_price === sweet.sweet_price))){
            this.sweets.find((s) => s.id === sweet.id).sweet_quantity += sweet.sweet_quantity;
            return; 
        }

        // Check if sweet with the same ID already exists
        if(this.sweets.some((s) => s.id === sweet.id)){
            throw new Error('Sweet with this ID already exists');
        }
        this.sweets.push(sweet);
    }
    getAllSweets(){
        // Check if there are any sweets
        if(this.sweets.length === 0){
            throw new Error('No sweets found');
        }
        return this.sweets;
    }

    deleteSweet(sweetId){
        // Check if sweet with the given ID exists
        const index = this.sweets.findIndex((s) => s.id === sweetId);
        // If not found, throw an error
        if(index === -1){
            throw new Error('Sweet with this ID does not exist');
        }
        this.sweets.splice(index, 1);
    }

    sortSweet(by, order){
        // Check if there are any sweets to sort
        this.sweets.sort((a, b) => {
            if(![ 'sweet_name', 'sweet_category', 'sweet_price'].includes(by)){
                throw new Error('Invalid sort key');
            }
            // Check if order is valid
            if(order === 'asc'){
                return a[by] > b[by] ? 1 : -1;
            } else if(order === 'desc'){
                return a[by] < b[by] ? 1 : -1;
            }
            throw new Error('Invalid sort order');
        });
    }

    purchaseSweet(sweetId, quantity){
        const sweet = this.sweets.find((s) => s.id === sweetId);
        // Check if sweet with the given ID exists
        if(!sweet){
            throw new Error('Sweet with this ID does not exist');
        }
        // Validate quantity
        if(sweet.sweet_quantity < quantity){
            throw new Error('Not enough quantity available');
        }
        sweet.sweet_quantity -= quantity;
        if(sweet.sweet_quantity === 0){
            this.deleteSweet(sweetId);
        }
        return {
            id: sweet.id,
            sweet_name: sweet.sweet_name,
            sweet_category: sweet.sweet_category,
            sweet_price: sweet.sweet_price,
            quantity_purchased: quantity,
            total_price: sweet.sweet_price * quantity
        };
    }
}


module.exports = new SweetShop();