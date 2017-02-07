package com.example.android.cokoas.Activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.android.cokoas.Asyntask.LoginAsyntask;
import com.example.android.cokoas.Asyntask.LoginMovilAsyntask;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

public class LoginActivity extends AppCompatActivity {
    private EditText editCodigo, editPassword;
    SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        sessionManager = new SessionManager(getApplication());
        editCodigo = (EditText) findViewById(R.id.input_codigo);
        editPassword = (EditText) findViewById(R.id.input_password);
        Boolean check = sessionManager.isLoggedIn();

        if(check){
            editCodigo.setText(sessionManager.getCodigo());
            editPassword.setText(sessionManager.getPassword());
            if(sessionManager.connectionCheck(this)) {
                new LoginAsyntask(this).execute(editCodigo.getText().toString(), editPassword.getText().toString());
            } else {
                int position = editCodigo.length();
                editCodigo.setSelection(position);
                Toast toast1 =
                        Toast.makeText(this,"No se puede iniciar sesión. Comprueba la conexión de red o inténtalo de nuevo más tarde.", Toast.LENGTH_LONG);
                toast1.show();
            }

        }
    }

    public void login(View view){

        if(sessionManager.connectionCheck(this)) {
            if (editCodigo.getText().length() > 0 && editPassword.getText().length() > 0) {
                Button button = (Button) findViewById(R.id.codigo_sign_in_button);
                button.setClickable(false);
                new LoginMovilAsyntask(this).execute(editCodigo.getText().toString(), editPassword.getText().toString());


            } else {
                Toast toast1 =
                        Toast.makeText(this, "Campos vacios", Toast.LENGTH_SHORT);
                toast1.show();
            }
        }else {
            Toast toast1 =
                    Toast.makeText(this,"No se puede iniciar sesión. Comprueba la conexión de red o inténtalo de nuevo más tarde.", Toast.LENGTH_LONG);
            toast1.show();
        }


    }
}
