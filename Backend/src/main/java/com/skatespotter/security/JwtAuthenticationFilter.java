package com.skatespotter.security;

import com.skatespotter.security.jwt.JwtUtil;
import com.skatespotter.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final CustomUserDetailsService userDetailsService;

	private static final List<String> PUBLIC_GET_ENDPOINTS = List.of("/api/spots","/api/verify", "/api/filter");

	private static final List<String> PUBLIC_POST_ENDPOINTS = List.of("/api/register", "/api/auth/login",
			"/api/verify");

	public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
		this.jwtUtil = jwtUtil;
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String path = request.getRequestURI();

		boolean isPublicGet = PUBLIC_GET_ENDPOINTS.stream().anyMatch(path::startsWith);
		boolean isPublicPost = PUBLIC_POST_ENDPOINTS.stream().anyMatch(path::startsWith);
		String method = request.getMethod();

		if ((isPublicGet && method.equals("GET")) || (isPublicPost && method.equals("POST"))) {
			filterChain.doFilter(request, response);
			return;
		}

		final String authHeader = request.getHeader("Authorization");

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token ausente ou inválido");
			return;
		}

		final String token = authHeader.substring(7);
		final String username = jwtUtil.extractUsername(token);

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			var userDetails = userDetailsService.loadUserByUsername(username);

			if (jwtUtil.isTokenValid(token)) {
				var authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authToken);
			} else {
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token JWT ");
				return;
			}
		}
		filterChain.doFilter(request, response);
	}
}
