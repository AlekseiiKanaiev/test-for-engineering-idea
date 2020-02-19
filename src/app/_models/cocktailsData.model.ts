export class CocktailModel {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
}

export class CocktailsData {
    drinks: CocktailModel[];
}

export class CoctailsList {
    category: string;
    cocktails: CocktailModel[];
}
