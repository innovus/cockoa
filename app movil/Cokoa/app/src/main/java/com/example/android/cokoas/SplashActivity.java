package com.example.android.cokoas;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.example.android.cokoas.Activities.LoginActivity;
import com.example.android.cokoas.Asyntask.LoginAsyntask;
import com.example.android.cokoas.SessionManager.SessionManager;

public class SplashActivity extends AppCompatActivity {
    SessionManager sessionManager;
    // Duración en milisegundos que se mostrará el splash
    private final int DURACION_SPLASH = 2000; // 2 segundos

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        sessionManager = new SessionManager(getApplication());
        final Boolean  check = sessionManager.isLoggedIn();
        final Activity activity = this;

        new Handler().postDelayed(new Runnable(){
            public void run(){
                // Cuando pasen los 2 segundos, pasamos a la actividad principal de la aplicación
                if(check){
                    if(sessionManager.connectionCheck(SplashActivity.this)) {
                        new LoginAsyntask(SplashActivity.this).execute(sessionManager.getCodigo(), sessionManager.getPassword());
                    } else {

                        Toast toast1 =
                                Toast.makeText(SplashActivity.this,"No se puede iniciar sesión. Comprueba la conexión de red o inténtalo de nuevo más tarde.", Toast.LENGTH_LONG);
                        toast1.show();
                    }
                }else {
                    Intent intent = new Intent(SplashActivity.this, LoginActivity.class);
                    startActivity(intent);
                    finish();
                }

            };
        }, DURACION_SPLASH);
    }
}
