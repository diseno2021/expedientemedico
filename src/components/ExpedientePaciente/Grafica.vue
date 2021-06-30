<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["datosGrafica", "numerosGrafica", "label"],
  watch: {
    datosGrafica() {
     this.renderizar()
    }
  },
  methods:{
    renderizar(){
       let dataRender = {
      labels: this.numerosGrafica,
      datasets: [
        {
          label: this.label,
          data: this.datosGrafica,
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "#36495d"
        }
      ]
    };
    this.renderChart(dataRender, {
      responsive: true,
      maintainAspectRatio: true
    });
    }
  },
  mounted() {
   this.renderizar();
  }
};
</script>
