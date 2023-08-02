import requests

def send_sms(to_mobile_number, message, template_id):

    username = 'courts-sik.sms'
    pin = 'K1tG1Vsm'
    signature = 'SHCSMS'
    entity_id = '1101444310000040161'
    #template_id = '1107165390653742984'
    try:
        url = "https://smsgw.sms.gov.in/failsafe/HttpLink?username="+username+"&pin="+pin+"&message="+message+"&mnumber="+to_mobile_number+"&signature="+signature+"&dlt_entity_id="+entity_id+"&dlt_template_id="+template_id
        requests.get(url, verify=False)
        print('Message Sent')
        return None
    except Exception as e:
        print(e)