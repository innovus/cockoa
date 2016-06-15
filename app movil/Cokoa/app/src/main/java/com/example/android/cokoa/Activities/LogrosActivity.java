package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.example.android.cokoa.Fragments.LogrosFragment;
import com.example.android.cokoa.R;

public class LogrosActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logros);
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragments, new LogrosFragment())
                    .commit();
        }
    }
}
