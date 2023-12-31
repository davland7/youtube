# Convertiseur de devises

![Devises](https://davland7.netlify.app/images/_a75c1761-511d-4be2-b97d-3190996c8cdb.jpg)

## Description

Calculatrice qui permet de convertir des devises.

## Exemples

Avec un montant de 1 CAD, on obtient les montants suivants

| CAD | CHF | CNY | EUR | GBP | JPY | USD |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0,64 | 5,41 | 0,68 | 0,59 | 107,41 | 0,76 |

Retour de l'API

```Json
[
  {
    "code": "CAD",
    "currencies": {
        "CAD": 1,
        "CHF": 0.6381630236,
        "CNY": 5.407640159,
        "EUR": 0.6817854821,
        "GBP": 0.591617762,
        "JPY": 107.4065797,
        "USD": 0.75720289
    },
    "name": "Dollar canadien"
  }
]
```

La fonction native toLocalString permet de formater un nombre en fonction de la langue et de la devise(CAD).

```typescript
const getAmount = (currency: string, locale: string, value: number) => {
  return (value * amount).toLocaleString(locale, {
    currency,
    minimumSignificantDigits: 10,
    style: 'currency'
  });
};
```

## Histoire des devises

Les devises, également connues sous le nom de monnaies, ont joué un rôle essentiel dans l'évolution économique et sociale de l'humanité à travers les siècles. L'histoire des devises remonte à l'Antiquité, lorsque les premières formes de monnaie ont émergé pour faciliter les échanges commerciaux. Ces premières devises étaient souvent des métaux précieux tels que l'or et l'argent, utilisés pour établir la valeur des biens et services.

Au fil du temps, les civilisations ont développé des systèmes monétaires plus sophistiqués, introduisant des pièces de monnaie frappées et des billets de banque. Les grandes puissances économiques ont créé leurs propres devises, reflétant leur influence et leur stabilité financière. L'histoire des devises est également marquée par des moments clés tels que l'adoption généralisée de l'étalon-or au XIXe siècle et l'évolution vers les systèmes de changes flottants au XXe siècle.

Aujourd'hui, les devises sont plus que de simples instruments d'échange ; elles sont le reflet des économies nationales, des politiques monétaires et des dynamiques commerciales mondiales. L'avènement de la mondialisation a conduit à une interconnexion plus étroite des marchés financiers, influençant les taux de change et redéfinissant la nature même des devises dans un monde en constante évolution. L'histoire des devises continue d'évoluer, façonnée par les forces économiques, politiques et technologiques de notre époque.

## Code et vidéo

- [GitHub](https://github.com/davland7/youtube/tree/main/src/components/CurrencyConverter)
- [YouTube](https://youtu.be/28ZBdaxW5vc?si=GHDNowcc1N6yPvGm)
