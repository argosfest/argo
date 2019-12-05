# Django
from django.core.serializers.json import DjangoJSONEncoder
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings

import json
import random
import math



# DATABASES

events_list = []
active_police_list = []

def index(req):
    res = json.dumps('oi')
    return HttpResponse(res, content_type='application/json')

# UTILS

def get_incident(police_id):
    for event in events_list:
        if event['assigned_id'] == police_id:
            return event

    return None


def get_angle(coords1, coords2):
    delta1 = ((coords1["lat"] - coords2["lat"])*math.pi)/180
    delta2 = ((coords1["lng"] - coords2["lng"])*math.pi)/180
    return math.acos(math.cos(delta1)*math.cos(delta2))*180/math.pi


"""
Descobre o policial mais proximo do evento
"""    
def assign_event(event_id):

    used_event = None
    for event in events_list:
        if event['id']==event_id:
            used_event = event

    if (not event) or event['assigned_id']:
        return {"status": 600, "message": "problems"}

    min_dist = 400
    for police in active_police_list:
        if police['busy']:
            continue
        angle_dif = get_angle(event['coords'], police['coords'])
        if angle_dif<min_dist:
            min_dist = angle_dif
            event['assigned_id'] = police['id']
            police['busy'] = True


# ROUTES

"""
Registra uma ocorrencia.
Recebe dados da ocorrência:
    - Coordenadas (location: {lng, lat})
    - Tipo (type)
    - Observações (obs)
Retorna:
    - 200, evento criado
"""
def register_event(req):
    event = json.loads(req.body.decode('utf-8'))
    print(event)
    event['assigned_id'] = False
    event['id'] = random.randint(0, 500000)
    events_list.append(event)

    assign_event(event['id'])
## Retornar outra coisa
    res = json.dumps({"status": 200, "message": "Parabéns, evento registrado"})
    return HttpResponse(res, content_type='application/json')


def register_police():
    #DO shit
    return 'Hello World'


def register_user():
    #DO shit
    return 'Hello World'


"""
**************************************************************************************************************
Retorna uma lista de ocorrências ativas, e, separadamente,
uma eventual ocorrência associada ao policial específico.
Essa rota é chamada várias vezes por minuto. 
Recebe dados da ocorrência:
    - id (
            Opcional; caso não seja enviado um id, entende-se que
            o usuario não é um policial.
            Quando o usuário for identificado como policial, retorna uma eventual
            ocorrência associada a ele.
        )
Retorna:
    - 200, Uma lista das ocorrências ativas, e caso seja um policial com ocorrencia
           ativa, retorna os dados dessa ocorrencia
**************************************************************************************************************
"""
# @app.route('/syncronize/<int:police_id>', methods = ['POST'])
def syncronize(req, police_id):

    req_data = req.POST

    data = {}

    try:
        police_id = req_data['id']

    except:
        police_id = None


    if police_id:
        if police_id not in [x['id'] for x in active_police_list]:
            police_data = req_data.copy()
            police_data['busy'] = False
            data['request'] = None
            active_police_list.append(police_data)
        else:
            data['request'] = get_incident(police_id)
            for police in active_police_list:
                if police['id'] == police_id:
                    police = req_data
                    is_busy = False

                    for event in events_list:
                        if event['assigned_id']==police_id:
                            is_busy = True
                            break
                    police['busy'] = is_busy
                    break

    data['events'] = events_list

    res = json.dumps(data)
    return HttpResponse(res, content_type='application/json')


# @app.route('/accepted_request/<int:police_id>/<int:event_id>')
# def accepted_request(police_id, event_id):
    
#     event_index = False
#     for index, event in enumerate(events_list):
#         if event['id']==event_id:
#             event_index = index

#     police_index = False
#     for index, event in enumerate(active_police_list):
#         if event['id']==police_id:
#             police_index = index

#     if (not police_index) or (not event_index):
#         return {"status": 500, "message": "An error has ocurred"}

#     events_list.pop(event_index)
#     active_police_list.pop(police_index)

#     return {"status": 200, "message": "You sucessfully accepted the request"}


## Refuse
# @app.route('/accepted_request/<int:police_id>/<int:event_id>')
def accept_request(req, police_id, event_id):
    
#     event_index = False
#     for index, event in enumerate(events_list):
#         if event['id']==event_id:
#             event_index = index

#     police_index = False
#     for index, event in enumerate(active_police_list):
#         if event['id']==police_id:
#             police_index = index

#     if (not police_index) or (not event_index):
#         return {"status": 500, "message": "An error has ocurred"}

#     events_list.pop(event_index)
#     active_police_list.pop(police_index)

    return {"status": 200, "message": "You sucessfully accepted the request"}

