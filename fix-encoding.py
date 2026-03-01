import json

json_path = r"d:\website\data\exchanges.json"

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for ex in data:
    if 'description' in ex and ex['description']:
        desc = ex['description']
        desc = desc.replace('Ã¢â‚¬â„¢', "'").replace('â€™', "'").replace('â€œ', '"').replace('â€', '"').replace('â€ ', '"')
        ex['description'] = desc
    
    if 'name' in ex and ex['name']:
        name = ex['name']
        name = name.replace('Ã¢â‚¬â„¢', "'").replace('â€™', "'").replace('â€œ', '"').replace('â€', '"').replace('â€ ', '"')
        ex['name'] = name

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("Encoding artifacts fixed via Python.")
