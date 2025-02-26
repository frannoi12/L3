# from django.conf.urls import patterns, url
from django.views.generic import TemplateView

# # Test patern, renders Zurb Foundation default page using base template
# urlpatterns = patterns('',
#     url(regex=r'^$',
#         view=TemplateView.as_view(template_name="foundation/index.html"),
#         name="foundation_index"),

#     url(regex=r'^scss/$',
#         view=TemplateView.as_view(template_name="foundation/scss/index.html"),
#         name="foundation_scss_index"),

#     url(regex=r'^icons/$',
#         view=TemplateView.as_view(template_name="foundation/icons.html"),
#         name="foundation_icons"),
# )

from django.urls import re_path

urlpatterns = [
    re_path(r'^$', TemplateView.as_view(template_name="foundation/index.html"), name="foundation_index"),
    re_path(r'^scss/$', TemplateView.as_view(template_name="foundation/scss/index.html"), name="foundation_scss_index"),
    re_path(r'^icons/$', TemplateView.as_view(template_name="foundation/icons.html"), name="foundation_icons"),
]
