from cedula import validate as validate_id
print(validate_id('4-564-2343'))

# output
# {
#   'is_valid': True,
#   'input': '4-564-2343',
#   'is_complete': True,
#   'id': ['', '4', '564', '2343'],
#   'unified': '004056402343'
# }
