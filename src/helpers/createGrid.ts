function createGrid<ItemType>(items: ItemType[], rowSize: number, addEmptyElement: boolean = false): ItemType[][] {
    const itemsGrid: ItemType[][] = []

    const rowsCount: number = Math.ceil((items.length + (addEmptyElement ? 1 : 0)) / rowSize)

    for (let i = 0; i < rowsCount; i++) {
        itemsGrid.push([])
    }

    for (let i = 0; i < items.length; i++) {
        itemsGrid[Math.floor(i / rowSize)].push(items[i])
    }

    return itemsGrid
}

export default createGrid