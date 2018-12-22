import os, socket, requests, json
"""
    ADD SECURITY!
"""



def parse_onion_file():
    file_data = ""
    with open("/var/lib/tor/hidden_service/hostname", "rb") as f:
        file_data = f.read().split(" ")
    return file_data[0], file_data[1]



def make_connect_data(onion_link, key, comp_name, local_ip, public_ip):
    return {"onion_link":onion_link, "key": key, "computer_name": comp_name, "local_ip": local_ip, "public_ip": public_ip}















# Globals
onion_link, key = parse_onion_file()
comp_name = socket.gethostname()
local_ip = [(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]
public_ip =  requests.get('https://api.ipify.org').text
#auth_key = 

# Request Header
headers = {"Content-Type": "application/json"}

#server URL
url = "localhost:3000"















def main():
    connect_data = make_connect_data(onion_link, key, comp_name, local_ip, public_ip)
    response = requests.put("http://{}/servers".format(url), data=connect_data, headers=headers)
    print response.text



main()













