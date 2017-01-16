package com.example.android.cokoas;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

/**
 * Created by juancarlospantoja@hotmail.com on 29/09/2016.
 */
public class MyFirebaseInstanceIdService extends FirebaseInstanceIdService {


    private static final String TAG = "MyFirebaseIIDService";



    @Override
    public void onTokenRefresh() {
        super.onTokenRefresh();
        String token = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "FBMToken: " + token);


       // sendRegistrationToServer(token);
    }


}
