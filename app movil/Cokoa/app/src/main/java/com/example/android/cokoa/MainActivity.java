package com.example.android.cokoa;

import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.example.android.cokoa.Fragments.AsistenciaFragment;
import com.example.android.cokoa.Fragments.CalificacionesFragment;
import com.example.android.cokoa.Fragments.EventosFragment;
import com.example.android.cokoa.Fragments.HorarioAtencionFragment;
import com.example.android.cokoa.Fragments.NotificacionFragment;
import com.example.android.cokoa.Fragments.PerfilFragment;
import com.example.android.cokoa.FragmentsProfesor.CursosProfesorFragment;
import com.example.android.cokoa.FragmentsProfesor.LlamarListaFragment;
import com.example.android.cokoa.SessionManager.SessionManager;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    DrawerLayout drawerLayout;
    SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sessionManager = new SessionManager(getApplication());
        if (savedInstanceState == null) {

            if(sessionManager.getUser().equals("1")){
                getSupportFragmentManager().beginTransaction()
                        .add(R.id.fragment, new CalificacionesFragment())
                        .commit();

            }else {
                getSupportFragmentManager().beginTransaction()
                        .add(R.id.fragment, new CursosProfesorFragment())
                        .commit();
            }

        }
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        //drawer.closeDrawer(GravityCompat.START);
        /* DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);*/
        drawerLayout.openDrawer(GravityCompat.START);


        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.inflateMenu(R.menu.navigation_with_teacher);



        if(sessionManager.getUser().equals("1")){
            navigationView.getMenu().clear();
            navigationView.inflateMenu(R.menu.activity_main_drawer);
            navigationView.getMenu().findItem(R.id.nav_calificaciones).setChecked(true);

        }else {
            navigationView.getMenu().clear();
            navigationView.inflateMenu(R.menu.navigation_with_teacher);
        }
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
            //        navigationView.getMenu().findItem(R.id.nav_calificaciones).setChecked(true);

        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_perfil) {
            //startActivity(new Intent(this, PerfilActivity.class));
            item.setChecked(true);
            setFragment(0);
            drawerLayout.closeDrawer(GravityCompat.START);
        } else if (id == R.id.nav_calificaciones) {
            item.setChecked(true);
            setFragment(1);
            drawerLayout.closeDrawer(GravityCompat.START);
            return true;
        } else if (id == R.id.nav_asistencia) {
            item.setChecked(true);
            setFragment(2);
            drawerLayout.closeDrawer(GravityCompat.START);
        } else if (id == R.id.nav_eventos) {
            item.setChecked(true);
            setFragment(3);
            drawerLayout.closeDrawer(GravityCompat.START);
        } else if (id == R.id.nav_notification) {
            item.setChecked(true);
            setFragment(4);
            drawerLayout.closeDrawer(GravityCompat.START);
        } else if (id == R.id.nav_horario_atencion) {
            item.setChecked(true);
            setFragment(5);
            drawerLayout.closeDrawer(GravityCompat.START);
        } else if (id == R.id.nav_logOut) {

            sessionManager = new SessionManager(getApplication());
            sessionManager.logoutUser();
            finish();

        }else if (id==R.id.nav_calificaciones_profesor){
            item.setChecked(true);
            setFragment(6);
            drawerLayout.closeDrawer(GravityCompat.START);
        }else if(id==R.id.nav_asistencia_profesor){
            item.setChecked(true);
            setFragment(7);
            drawerLayout.closeDrawer(GravityCompat.START);
        }
        else if (id == R.id.offProfesor) {

            sessionManager = new SessionManager(getApplication());
            sessionManager.logoutUser();
            finish();

        }
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

    public void setFragment(int position) {
        switch (position) {
            case 0:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                PerfilFragment perfilFragment = new PerfilFragment();
                fragmentTransaction.replace(R.id.fragment, perfilFragment);
                fragmentTransaction.commit();
                break;
            case 1:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                CalificacionesFragment calificacionesFragment = new CalificacionesFragment();
                fragmentTransaction.replace(R.id.fragment, calificacionesFragment);
                fragmentTransaction.commit();
                break;
            case 2:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                AsistenciaFragment asistenciaFragment = new AsistenciaFragment();
                fragmentTransaction.replace(R.id.fragment, asistenciaFragment);
                fragmentTransaction.commit();
                break;
            case 3:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                EventosFragment eventosFragment = new EventosFragment();
                fragmentTransaction.replace(R.id.fragment,eventosFragment );
                fragmentTransaction.commit();
                break;
            case 4:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                NotificacionFragment notificacionFragment = new NotificacionFragment();
                fragmentTransaction.replace(R.id.fragment, notificacionFragment);
                fragmentTransaction.commit();
                break;
            case 5:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                HorarioAtencionFragment horarioAtencionFragment = new HorarioAtencionFragment();
                fragmentTransaction.replace(R.id.fragment, horarioAtencionFragment);
                fragmentTransaction.commit();
                break;
            case 6:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                CursosProfesorFragment cursosProfesorFragment = new CursosProfesorFragment();
                fragmentTransaction.replace(R.id.fragment, cursosProfesorFragment);
                fragmentTransaction.commit();
                break;
            case 7:
                fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                LlamarListaFragment llamarListaFragment = new LlamarListaFragment();
                fragmentTransaction.replace(R.id.fragment, llamarListaFragment);
                fragmentTransaction.commit();

                break;

        }
    }

}
