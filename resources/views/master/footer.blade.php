


<footer role="contentinfo" id="intranet-footer">
	<a href="#" class="intranet-arrow intranet-gotop footer-box"><i class="fa fa-angle-up"></i></a>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-sm-6 footer-box">
				<h3 class="intranet-footer-heading">Acercate</h3>
				{{-- <p>asd jak djkslajd sk daksd jasl djas djaks djakls djalsk djaskd laksjd alkdjalkjakdja</p> --}}
				<ul class="intranet-footer-contact">
					@if(getContent("datos-de-contacto")->address!="")
						<li><a href="{{getContent("datos-de-contacto")->mapsurl}}" target="blank" rel="nofollow"><i class="fa fa-map-marker"></i><span>{{getContent("datos-de-contacto")->address}}
						@if(getContent("datos-de-contacto")->address2!="")
							<br>{{getContent("datos-de-contacto")->address2}}
						@endif
						</span></a></li>
					@endif
					@if(getContent("datos-de-contacto")->email!="")
						<li><a href="mailto:{{getContent("datos-de-contacto")->email}}?subject=Consulta Web"><i class="fa fa-envelope"></i><span>{{getContent("datos-de-contacto")->email}}</span></a></li>
					@endif
					@if(getContent("datos-de-contacto")->phone!="")
						<li><a href="tel{{getContent("datos-de-contacto")->phone}}"><i class="fa fa-phone"></i><span>{{getContent("datos-de-contacto")->phone}}</span></a></li>
					@endif
					@if(getContent("datos-de-contacto")->cellphone!="")
						<li><a href="tel:{{getContent("datos-de-contacto")->cellphone}}"><i class="fa fa-mobile"></i><span>{{getContent("datos-de-contacto")->cellphone}}</span></a></li>
					@endif
				</ul>
				<p><a href="/contacto" class="btn btn-outline btn-sm">Contacto</a></p>

			</div>
			<div class="col-md-4 col-sm-6 footer-box">
				<h3 class="intranet-footer-heading">Menú</h3>
				<ul class="intranet-footer-links">
					<li><a href="/">Home</a></li>
					<li><a href="/perfil">Mi Perfil</a></li>
					<li><a href="/proyectos">Mis Proyectos</a></li>
					<li><a href="/contacto">Contacto</a></li>
				</ul>
			</div>
			<div class="col-md-4 col-sm-12 footer-box">
				@if(getContent("redes-sociales")->linkedin!=""||getContent("redes-sociales")->facebook!=""||getContent("redes-sociales")->instagram!=""||getContent("redes-sociales")->google!="")
					<h3 class="intranet-footer-heading">Redes Sociales</h3>
				@endif
				<ul class="intranet-social-icons">
					@if(getContent("redes-sociales")->linkedin!="")
						<li><a href="{{getContent("redes-sociales")->linkedin}}" target="_blank" rel="nofollow"><i class="fa fa-linkedin"></i></a></li>
					@endif
					@if(getContent("redes-sociales")->facebook!="")
						<li><a href="{{getContent("redes-sociales")->facebook}}" target="_blank" rel="nofollow"><i class="fa fa-facebook"></i></a></li>
					@endif
					@if(getContent("redes-sociales")->instagram!="")
						<li><a href="{{getContent("redes-sociales")->instagram}}" target="_blank" rel="nofollow"><i class="fa fa-instagram"></i></a></li>
					@endif
					@if(getContent("redes-sociales")->google!="")
						<li><a href="{{getContent("redes-sociales")->google}}" target="_blank" rel="nofollow"><i class="fa fa-google"></i></a></li>
					@endif
					@if(getContent("redes-sociales")->twitter!="")
						<li><a href="{{getContent("redes-sociales")->twitter}}" target="_blank" rel="nofollow"><i class="fa fa-twitter"></i></a></li>
					@endif
				</ul>
			</div>
			<div class="col-md-12 footer-box">
				<div class="intranet-copyright">
				<p>&copy; 2017 Intranet. Todos los derechos reservados. <br>Diseñado y desarrollado por <a href="http://www.agenciaego.com.ar" target="_blank">Agencia EGO</a></p>
				</div>
			</div>

		</div>

	</div>
</footer>

