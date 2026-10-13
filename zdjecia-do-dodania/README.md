# Zdjęcia do dodania

Wrzucaj tu zdjęcia prosto z telefonu (JPG lub HEIC), w folderach:

```
zdjecia-do-dodania/
  narozniki/
    Słocina/            ← nazwa folderu = podpis pod zdjęciem (osiedle, miejscowość)
      IMG_1001-przed.jpg
      IMG_1002-po.jpg
  kanapy/
    Tyczyn/
      przed/            ← albo podfoldery „przed” i „po”
        IMG_2001.jpg
      po/
        IMG_2002.jpg
```

Kategorie: `narozniki`, `kanapy`, `fotele-i-krzesla`, `materace`, `dywany`, `auta`.

Potem w terminalu: `npm run zdjecia`. Zawartość tego folderu nie trafia do repozytorium (zdjęcia z telefonu mają GPS w metadanych).
