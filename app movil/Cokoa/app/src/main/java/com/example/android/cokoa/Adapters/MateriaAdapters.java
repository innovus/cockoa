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
public class MateriaAdapters extends RecyclerView.Adapter<MateriaAdapters.ViewHolder> {

    public static ArrayList<Materia> materia;
    public static Activity activity;

    public MateriaAdapters(ArrayList<Materia> materia, Activity activity) {
        super();
        this.materia = materia;
        this.activity = activity;
    }


    //cuando se crea
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_materias, viewGroup, false);
        return new ViewHolder(v);
    }

    //cuando se conecta
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.nameArea.setText(materia.get(position).getNombre_materia());
        viewHolder.name1Docente.setText("Prof: " + materia.get(position).getNombre1_docente() + materia.get(position).getNombre2_docente() + materia.get(position).getApellido1_docente() + materia.get(position).getApellido2_docente());
        double v = materia.get(position).getNotaPeriodo1();

        String s = String.valueOf(v);
        viewHolder.txtperiodo1.setText(s);
        viewHolder.txtperiodo2.setText(String.valueOf(materia.get(position).getNotaPeriodo2()));
        viewHolder.txtperiodo3.setText(String.valueOf(materia.get(position).getNotaPeriodo3()));
        viewHolder.txtperiodo4.setText(String.valueOf(materia.get(position).getNotaPeriodo4()));
        viewHolder.promedio.setText(String.valueOf(materia.get(position).getPromedio()));
        viewHolder.feed = materia.get(position);
    }

    @Override
    public int getItemCount() {
        return materia.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView nameArea, name1Docente,txtperiodo1,txtperiodo2,txtperiodo3,txtperiodo4,promedio;
        public Materia feed;

        public ViewHolder(View itemView) {
            super(itemView);
            nameArea = (TextView) itemView.findViewById(R.id.id_text_prueba_fragment);
            name1Docente = (TextView) itemView.findViewById(R.id.id_text_nombre_docente);
            txtperiodo1 = (TextView) itemView.findViewById(R.id.txtPeriodo1);
            txtperiodo2 = (TextView) itemView.findViewById(R.id.txtPeriodo2);
            txtperiodo3 = (TextView) itemView.findViewById(R.id.txtPeriodo3);
            txtperiodo4 = (TextView) itemView.findViewById(R.id.txtPeriodo4);
            promedio = (TextView) itemView.findViewById(R.id.txtPromedio);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, LogrosActivity.class);
                    intent.putExtra("id_materia", feed.getId_materia());
                    intent.putExtra("periodo_actual",feed.getPeriodo_actual());
                    intent.putExtra("promedio",feed.getPromedio());
                    activity.startActivity(intent);
                }
            });
        }
    }

}
