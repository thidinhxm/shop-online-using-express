function Cart(oldCart) {
    this.items = oldCart || {}
    this.totalQuantity = oldCart.totalQuantity || 0
    this.totalPrice = oldCart.totalPrice || 0
    this.address = oldCart.address || {}
    this.paymentMethod = oldCart.paymentMethod || "COD"
    
    this.getTotalQuantity = () => {
        let quantity = 0
        for (let id in this.items) {
            quantity += parseInt(this.items[id].quantity)
        }
        return quantity
    }

    this.getTotalPrice = () => {
        let price = 0
        for (let id in this.items) {
            price += parseFloat(this.items[id].price)
        }
        return price.toFixed(2)
    }

    this.add = (item, id, quantity) => {
        const storedItem = this.items[id]
        if (!storedItem) {
            this.items[id] = {
                item: item,
                quantity: 0,
                price: 0,
            }
        }
        storedItem.item.price = parseFloat(storedItem.item.price);
        storedItem.quantity += parseInt(quantity);
        storedItem.price = parseFloat(storedItem.item.price * storedItem.quantity);
        this.totalQuantity = this.getTotalQuantity();
        this.totalPrice = this.getTotalPrice();
        return this.getCartItem(id);
    }
    
    this.remove = (id) => {
        const storedItem = this.items[id]
        if (storedItem) {
            delete this.items[id]
            this.totalQuantity = this.getTotalQuantity()
            this.totalPrice = this.getTotalPrice()
        }
    }

    this.empty = () => {
        this.items = {}
        this.totalQuantity = 0
        this.totalPrice = 0
    }

    this.generateArray = () => {
        return Object.values(this.items)
    }

    this.getCart = () => {
        return {
            items: this.generateArray(),
            totalQuantity: this.totalQuantity,
            totalPrice: this.totalPrice,
            address: this.address,
            paymentMethod: this.paymentMethod,
        }
    }
    this.getCartItem = id => {
        return {
            item: this.items[id],
            totalQuantity: this.totalQuantity,
            totalPrice: this.totalPrice,
        }
    }
}