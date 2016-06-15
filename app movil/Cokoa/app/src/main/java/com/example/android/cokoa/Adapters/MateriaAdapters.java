package com.example.android.cokoa.Adapters;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoa.Activities.LogrosActivity;
import com.example.android.cokoa.Models.Materia;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 08/06/2016.
 */
public class MateriaAdapters extends RecyclerView.Adapter<MateriaAdapters.ViewHolder>{

    private ArrayList<Materia> materia;
    private static Activity activity;

    public MateriaAdapters(ArrayList<Materia> materias,Activity activity){
        super();
        this.materia = materias;
        this.activity = activity;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder  {
        public TextView nameArea,name1Docente;
        public ViewHolder(View itemView) {
            super(itemView);
            nameArea = (TextView) itemView.findViewById(R.id.id_text_prueba_fragment);
            name1Docente = (TextView) itemView.findViewById(R.id.id_text_nombre_docente);

            //itemView.setOnClickListener(new View.OnClickListener() {
            itemView.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    /* String forecast = mForecastAdapter.getItem(position);
                Toast toast = Toast.makeText(getActivity() ,forecast, Toast.LENGTH_SHORT);
                toast.show();
                Intent intent = new Intent(getActivity(), DetailActivity.class)
                        .putExtra(Intent.EXTRA_TEXT, forecast);
                startActivity(intent);*/

                    /* Intent i = new Intent (activity, CardGalleryActivity.class);
                    i.putExtra("urlImgGallery", feed.getUrlGallery());
                    i.putExtra("dateGallery", feed.getDateTimeGallery());
                    i.putExtra("titleGallery", feed.getTitleGallery());
                    i.putExtra("descriptionGallery", feed.getDescriptionGallery());
                    activity.startActivity(i);*/

                    Intent intent = new Intent(activity, LogrosActivity.class);
                    activity.startActivity(intent);
                    /*LogrosAsyntask logrosAsyntask = new LogrosAsyntask(activity);
                    logrosAsyntask.execute();*/
                   // FragmentManager fragmentManager;
                   /* FragmentTransaction fragmentTransaction;

                    fragmentManager = getSupportFragmentManager();
                    fragmentTransaction = fragmentManager.beginTransaction();
                    LogrosFragment logrosFragment = new LogrosFragment();
                    fragmentTransaction.replace(R.id.fragment, logrosFragment);
                    fragmentTransaction.commit();*/

                    /*FragmentTransaction transaction = fragmentManager.beginTransaction();
                    LogrosFragment logrosFragments = new LogrosFragment();
                    transaction.replace(R.id.fragment, logrosFragments);
                    transaction.commit();*/


                    /*Fragment fragment = fragments.get(position);
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.add(holder.itemView.getId(), fragment, TAG + "pos" + position);
        transaction.commit();*/



                }
            });
        }
    }



    //cuando se crea
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_materias,viewGroup,false);
        return new ViewHolder(v);
    }
    //cuando se conecta
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.nameArea.setText(materia.get(position).getNombre_materia());
        String nombre1 = materia.get(position).getNombre1_docente();

        viewHolder.name1Docente.setText("Prof: "+materia.get(position).getNombre1_docente()+ materia.get(position).getNombre2_docente()+materia.get(position).getApellido1_docente()+materia.get(position).getApellido2_docente());
    }

    @Override
    public int getItemCount() {
        return materia.size();
    }


    //public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.ViewHolder> {
}
