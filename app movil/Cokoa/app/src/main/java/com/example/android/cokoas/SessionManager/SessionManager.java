package com.example.android.cokoas.SessionManager;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

/**
 * Created by ASUS on 07/06/2016.
 */
public class SessionManager {
    // Shared Preferences
    SharedPreferences pref;
    // Editor for Shared preferences
    SharedPreferences.Editor editor;
    // Context
    Context _context;
    // Shared pref mode
    int PRIVATE_MODE = 0;
    // Sharedpref file name
    private static final String PREF_NAME = "LogeoPref";
    // All Shared Preferences Keys
    private static final String IS_LOGIN = "IsLoggedIn";
    // User name (make variable public to access from outside)
    public static final String KEY_TOKEN = "token";
    //User codigo
    public static final String CODIGO = "codigo";
    //User Pass
    public static final String PASSWORD = "password";
    //Tipo Usuario
    public static final String USER = "usuario";
    //id_estudiante
    public static final String ID_ESTUDIANTE = "id_estudiante";

    // Constructor
    public SessionManager(Context context) {
        this._context = context;
        pref = _context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    /**
     * Create login session
     */
    public void createLoginSession(String token, String codigo, String pass, String user) {
        // Storing login value as TRUE
        editor.putBoolean(IS_LOGIN, true);
        // Storing name in pref
        editor.putString(KEY_TOKEN, token);
        editor.putString(CODIGO, codigo);
        editor.putString(PASSWORD, pass);
        editor.putString(USER, user);
        editor.putString(ID_ESTUDIANTE, "30011");

        // commit changes
        editor.commit();
    }

    /**
     * Comprobar coneccion
     */
    public static boolean connectionCheck(Context ctx) {
        boolean connection = false;
        ConnectivityManager connMgr = (ConnectivityManager) ctx
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {

        try {
            Process p = java.lang.Runtime.getRuntime().exec("ping -c 1 www.google.com");

            int val           = p.waitFor();
            boolean reachable = (val == 0);
             connection = reachable;

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
            //connection = true;

        }
        return connection;
    }

    /*/**
     * Clear session details
     * */
    public void logoutUser() {
        // Clearing all data from Shared Preferences
        editor.clear();
        editor.commit();

        /*
        // After logout redirect user to Loing Activity
        Intent i = new Intent(_context, LoginActivity.class);
        // Closing all the Activities
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        // Add new Flag to start new Activity
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        // Staring LoginActivity Activity
        _context.startActivity(i);
*/
    }


    public boolean isLoggedIn() {
        return pref.getBoolean(IS_LOGIN, false);
    }

    public String getCodigo() {
        return pref.getString(CODIGO, null);
    }

    public String getPassword() {
        return pref.getString(PASSWORD, null);
    }

    public String getKeyToken() {
        return pref.getString(KEY_TOKEN, null);
    }

    public String getUser() {
        return pref.getString(USER, null);
    }
    public String getIdEstudiante() {
        return pref.getString(ID_ESTUDIANTE, null);
    }

}
