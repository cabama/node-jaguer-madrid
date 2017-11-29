
// NOT WORK
export function everyTrue (array: Array<boolean>): boolean {
	console.log('Estoy en everyTrue',array)
	array.forEach(element => {
		if (element == false) {return false}
	});
	return true
}

export function everyExist (array: Array<any>): boolean {
	for (let i = 0 ; i<array.length; i++ ){
		let elemento = !!array[i]        
		if (elemento == false) {
			return false
		}
	}
	return true
}

export function deleteKey (obj: any, key: string): any {
	const index: number = this.data.indexOf(key);
	if (index !== -1) {
		this.data.splice(index, 1);
	}
}