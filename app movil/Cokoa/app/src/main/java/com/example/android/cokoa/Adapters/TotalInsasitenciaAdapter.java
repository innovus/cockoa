package com.example.android.cokoa.Adapters;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoa.Activities.InasistenciaMateriaActivity;
import com.example.android.cokoa.Models.Inasistencia;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 30/06/2016.
 */

public class TotalInsasitenciaAdapter extends RecyclerView.Adapter<TotalInsasitenciaAdapter.ViewHolder> {

    public static ArrayList<Inasistencia> inasistencias;
    public static Activity activity;

    public TotalInsasitenciaAdapter(ArrayList<Inasistencia> inasistencias, Activity activity) {
        super();
        this.inasistencias = inasistencias;
        this.activity = activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_total_inasistencia, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.nameMateria.setText(inasistencias.get(position).getNombreMateria());
        viewHolder.totalInasistencia.setText(inasistencias.get(position).getTotalInasistencia());
        viewHolder.inasistencia = inasistencias.get(position);
    }

    @Override
    public int getItemCount() {
        return inasistencias.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView nameMateria, totalInasistencia;
        public Inasistencia inasistencia;

        public ViewHolder(View itemView) {
            super(itemView);
            nameMateria = (TextView) itemView.findViewById(R.id.id_text_nombre_materia_inasistencia);
            totalInasistencia = (TextView) itemView.findViewById(R.id.id_text_total_inasistencia);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, InasistenciaMateriaActivity.class);
                    intent.putExtra("id_materia",inasistencia.getIdMateria());
                     activity.startActivity(intent);

                }
            });
        }

    }

}
